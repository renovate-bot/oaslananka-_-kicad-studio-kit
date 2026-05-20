#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import {
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const WORKSPACES = [
  {
    name: "vscode-extension",
    path: "apps/vscode-extension",
    sourceRoots: ["src", "test", "scripts"],
    forbiddenTokens: ["packages/mcp-server/src", "packages/mcp-npm/bin"],
    forbiddenModules: [/^kicad_mcp(?:\.|$)/],
  },
  {
    name: "mcp-server",
    path: "packages/mcp-server",
    sourceRoots: ["src", "tests", "scripts"],
    forbiddenTokens: ["apps/vscode-extension/src", "packages/mcp-npm/bin"],
    forbiddenModules: [/^kicadstudio(?:\/|$)/],
  },
  {
    name: "mcp-npm",
    path: "packages/mcp-npm",
    sourceRoots: ["bin"],
    forbiddenTokens: ["apps/vscode-extension/src", "packages/mcp-server/src"],
    forbiddenModules: [/^kicadstudio(?:\/|$)/, /^kicad_mcp(?:\.|$)/],
  },
].map((workspace) => ({
  ...workspace,
  absolutePath: resolve(REPO_ROOT, workspace.path),
}));

const IGNORED_DIRS = new Set([
  ".git",
  ".mypy_cache",
  ".pytest_cache",
  ".ruff_cache",
  ".venv",
  "__pycache__",
  "coverage",
  "dist",
  "htmlcov",
  "node_modules",
  "out",
  "site",
]);

const SCANNED_EXTENSIONS = new Set([
  ".cjs",
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".py",
]);
const ALLOWED_METADATA_READS = new Map([
  [
    "packages/mcp-server/scripts/check_compatibility_matrix.py",
    new Set(["apps/vscode-extension/src"]),
  ],
]);
const IMPORT_PATTERNS = [
  /\b(?:import|export)\s+(?:type\s+)?(?:[^'"]*?\s+from\s+)?["']([^"']+)["']/g,
  /\b(?:require|import)\(\s*["']([^"']+)["']\s*\)/g,
  /^\s*from\s+([A-Za-z_][\w.]*|\.+[\w.]*)\s+import\s+/gm,
  /^\s*import\s+([A-Za-z_][\w.]*)/gm,
];

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function isWithin(child, parent) {
  const relativePath = relative(parent, child);
  return (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !isAbsolute(relativePath))
  );
}

function walk(directory) {
  if (!existsSync(directory)) {
    return [];
  }
  const entries = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      entries.push(...walk(absolutePath));
    } else if (entry.isFile() && SCANNED_EXTENSIONS.has(extname(entry.name))) {
      entries.push(absolutePath);
    }
  }
  return entries;
}

function extractImports(content) {
  const specifiers = [];
  for (const pattern of IMPORT_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      specifiers.push({
        specifier: match[1],
        index: match.index,
      });
    }
  }
  return specifiers;
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function workspaceForPath(path) {
  return WORKSPACES.find((workspace) => isWithin(path, workspace.absolutePath));
}

function targetWorkspaceForImport(file, specifier) {
  if (!specifier.startsWith(".")) {
    return undefined;
  }
  const targetPath = resolve(dirname(file), specifier);
  return workspaceForPath(targetPath);
}

function validateRequiredTopology() {
  const violations = [];
  for (const workspace of WORKSPACES) {
    if (
      !existsSync(workspace.absolutePath) ||
      !statSync(workspace.absolutePath).isDirectory()
    ) {
      violations.push({
        file: workspace.path,
        line: 1,
        reason: `required workspace ${workspace.path} is missing`,
      });
    }
  }
  return violations;
}

function validateWorkspace(workspace) {
  const violations = [];
  const files = workspace.sourceRoots.flatMap((sourceRoot) =>
    walk(resolve(workspace.absolutePath, sourceRoot)),
  );

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const relativeFile = toPosixPath(relative(REPO_ROOT, file));
    const normalizedContent = content.replaceAll("\\", "/");

    for (const token of workspace.forbiddenTokens) {
      if (ALLOWED_METADATA_READS.get(relativeFile)?.has(token)) {
        continue;
      }
      const index = normalizedContent.indexOf(token);
      if (index !== -1) {
        violations.push({
          file: relativeFile,
          line: lineNumberAt(content, index),
          reason: `references another product workspace path: ${token}`,
        });
      }
    }

    for (const { specifier, index } of extractImports(content)) {
      if (
        workspace.forbiddenModules.some((pattern) => pattern.test(specifier))
      ) {
        violations.push({
          file: relativeFile,
          line: lineNumberAt(content, index),
          reason: `imports another product's implementation module: ${specifier}`,
        });
      }

      const targetWorkspace = targetWorkspaceForImport(file, specifier);
      if (targetWorkspace && targetWorkspace.name !== workspace.name) {
        violations.push({
          file: relativeFile,
          line: lineNumberAt(content, index),
          reason: `relative import crosses from ${workspace.path} to ${targetWorkspace.path}: ${specifier}`,
        });
      }
    }
  }

  return violations;
}

const violations = [
  ...validateRequiredTopology(),
  ...WORKSPACES.flatMap((workspace) => validateWorkspace(workspace)),
];

if (violations.length > 0) {
  console.error("Monorepo boundary violations found:");
  for (const violation of violations) {
    console.error(`- ${violation.file}:${violation.line} ${violation.reason}`);
  }
  process.exit(1);
}

console.log("No monorepo boundary violations found.");
