# Release Model

KiCad Studio Kit uses one repository and separate product release surfaces.

| Product              | Version file                         | Artifact          | Publish workflow           |
| -------------------- | ------------------------------------ | ----------------- | -------------------------- |
| VS Code extension    | `apps/vscode-extension/package.json` | VSIX              | `publish-extension.yml`    |
| Python MCP server    | `packages/mcp-server/pyproject.toml` | sdist / wheel     | `publish-python.yml`       |
| npm launcher         | `packages/mcp-npm/package.json`      | npm package       | `publish-npm.yml`          |
| MCP Registry listing | `packages/mcp-server/server.json`    | registry metadata | `publish-mcp-registry.yml` |

Release Please owns version proposals through `.release-please-manifest.json` and `release-please-config.json`. The current baseline keeps all public surfaces at `1.0.0`.

## Compatibility gate

Before release, compatibility metadata must agree across the root matrix, extension, MCP server, and MCP Registry manifests:

```bash
corepack pnpm run check:version
corepack pnpm run check:compatibility
corepack pnpm run test:contract
```

The extension declares the MCP server range it supports, and the MCP server advertises protocol/tool compatibility through its server metadata.

## Release ownership

Release and publish execution is intentionally external to normal development work:

- The release PR may update versions and changelogs.
- Publishing uses protected GitHub environments.
- PyPI and npm publish through trusted publishing/OIDC.
- Marketplace publish uses `VSCE_PAT` and `OVSX_PAT` in the `extension-marketplaces` environment.

Do not publish from local development shells.
