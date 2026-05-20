# Architecture

The repository is split by release surface:

- `apps/vscode-extension`: VS Code and Open VSX extension root.
- `packages/mcp-server`: Python package and MCP Registry source of truth.
- `packages/mcp-npm`: npm wrapper that launches the Python package through `uvx`.

Root metadata only orchestrates workspace checks, release automation, documentation, and publish workflows.

Detailed architecture documents:

- [Repository structure](architecture/repo-structure.md)
- [Product boundaries](architecture/product-boundaries.md)
- [Release model](architecture/release-model.md)
- [Testing strategy](architecture/testing-strategy.md)
- [Migration phases](architecture/migration-phases.md)
- [KiCad Studio and MCP integration](integration/kicad-studio-mcp.md)
