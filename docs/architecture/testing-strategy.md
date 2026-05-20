# Testing Strategy

The repository supports product-scoped validation and full monorepo validation.

## Root checks

```bash
corepack pnpm run check
```

The root check runs repository metadata checks, boundary checks, version checks, compatibility checks, governance self-tests, and every workspace `check` script.

## Product-scoped checks

```bash
corepack pnpm run check:kicad-studio
corepack pnpm run test:kicad-studio
corepack pnpm run build:kicad-studio
corepack pnpm run package:kicad-studio
```

```bash
uv sync --all-extras --frozen --project packages/mcp-server
corepack pnpm run check:kicad-mcp-pro
corepack pnpm run test:kicad-mcp-pro
corepack pnpm run build:kicad-mcp-pro
corepack pnpm run package:kicad-mcp-pro
```

```bash
corepack pnpm run check:mcp-npm
```

## Contract and fixture checks

```bash
corepack pnpm run test:contract
corepack pnpm run test:fixtures
```

`test:contract` verifies compatibility metadata and MCP manifests. `test:fixtures` currently runs the MCP unit fixture suite; when a dedicated shared fixture package is introduced, this command should become the stable root entrypoint for that package.

## CI lanes

The GitHub Actions CI workflow has separate jobs for:

- metadata and repo policy
- VS Code extension
- MCP server
- npm launcher
- forbidden-reference scanning

Each product job uses its own package/build commands so one product can fail without hiding the other product's state.
