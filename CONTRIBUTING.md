# Contributing

Use the canonical repository at https://github.com/oaslananka/kicad-studio-kit.

Before opening a pull request, run:

```bash
corepack pnpm run check:forbidden-refs
corepack pnpm run check:version
corepack pnpm run check:compatibility
```

Report KiCad, VS Code, MCP protocol, dependency, or release-tool compatibility failures with the compatibility regression issue form. Include old and new versions, the failing command or workflow, and any canary run link.
