import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../..");

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function check(description, condition) {
  return { description, ok: Boolean(condition) };
}

export function createBetaProgramChecks() {
  const betaProgram = readText("docs/beta-program.md");
  const contributors = readText("CONTRIBUTORS.md");
  const discussionForm = readText(
    ".github/DISCUSSION_TEMPLATE/beta-feedback.yml",
  );
  const rootPackage = readJson("package.json");
  const extensionPackage = readJson("apps/vscode-extension/package.json");
  const englishNls = readJson("apps/vscode-extension/package.nls.json");
  const packageExtensionScript = readText(
    "apps/vscode-extension/scripts/package-extension.js",
  );
  const workflow = readText(".github/workflows/publish-extension.yml");
  const labels = readText(".github/labels.yml");

  const checks = [];
  for (const expected of [
    "beta-feedback",
    "KiCad Studio: Send Feedback",
    "source:beta",
    "2-week beta cycles",
    "10-20 beta testers",
    "weekly async email digest",
    "KiCad Studio Beta",
    "KiCad Studio Stable",
    "no NDA",
  ]) {
    checks.push(
      check(
        `docs/beta-program.md mentions ${expected}`,
        new RegExp(expected, "iu").test(betaProgram),
      ),
    );
  }

  checks.push(
    check(
      "CONTRIBUTORS.md has beta tester recognition section",
      /Beta tester recognition/iu.test(contributors),
    ),
    check(
      "discussion form applies source:beta label",
      /labels:\s*\["source:beta"\]/u.test(discussionForm),
    ),
    check(
      "discussion form captures OS matrix",
      /id:\s*operating-systems/u.test(discussionForm),
    ),
    check(
      "discussion form captures workflow",
      /id:\s*workflow/u.test(discussionForm),
    ),
    check(
      "discussion form captures consent",
      /id:\s*consent/u.test(discussionForm),
    ),
    check(
      "GitHub label sync includes source:beta",
      /name:\s*source:beta/u.test(labels),
    ),
    check(
      "root test script exists",
      rootPackage.scripts?.["test:beta-program"] ===
        "node --test scripts/check-beta-program.test.mjs",
    ),
    check(
      "root check script runs beta program check and test",
      rootPackage.scripts?.["check:beta-program"] ===
        "node scripts/check-beta-program.mjs && pnpm run test:beta-program",
    ),
    check(
      "root check includes beta gate",
      /check:beta-program/u.test(rootPackage.scripts?.check ?? ""),
    ),
    check(
      "extension contributes Send Feedback command",
      extensionPackage.contributes?.commands?.some(
        (command) => command.command === "kicadstudio.sendFeedback",
      ),
    ),
    check(
      "extension exposes Send Feedback in command palette",
      extensionPackage.contributes?.menus?.commandPalette?.some(
        (item) => item.command === "kicadstudio.sendFeedback",
      ),
    ),
    check(
      "English command title is present",
      englishNls["kicadstudio.contributes.commands.92.title"] ===
        "KiCad Studio: Send Feedback",
    ),
    check(
      "publish workflow passes pre-release package env",
      /KICAD_STUDIO_EXTENSION_PRE_RELEASE/u.test(workflow),
    ),
    check(
      "publish workflow uses marketplace pre-release flag",
      /--pre-release/u.test(workflow),
    ),
    check(
      "package script honors pre-release env",
      /KICAD_STUDIO_EXTENSION_PRE_RELEASE/u.test(packageExtensionScript),
    ),
    check(
      "package script honors pre-release CLI flag",
      /process\.argv\.includes\('--pre-release'\)/u.test(
        packageExtensionScript,
      ),
    ),
    check(
      "package script passes vsce pre-release flag",
      /\.\.\.\(isPreRelease \? \['--pre-release'\] : \[\]\)/u.test(
        packageExtensionScript,
      ),
    ),
    check("publish workflow recognizes beta tags", /-beta\./u.test(workflow)),
  );

  return checks;
}
