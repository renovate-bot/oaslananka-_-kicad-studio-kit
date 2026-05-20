# Branch Protection Policy

Apply this policy to `main` after the repository environments and required checks are available.

## Required status checks

- `CI / metadata`
- `CI / vscode-extension`
- `CI / mcp-server`
- `CI / mcp-npm`
- `CI / forbidden-refs`
- `CodeQL / analyze`
- `Security / security`
- `Gitleaks / scan`
- `Docs / build`

Scorecard should stay enabled as a repository health signal. It can be required once the repository has stable branch protection and token permissions.

## Review ownership

Enable CODEOWNERS review. Path ownership is declared in `.github/CODEOWNERS`:

- `.github/`: CI, release, labels, and governance.
- `docs/architecture/`: architecture and release model.
- `apps/vscode-extension/`: KiCad Studio extension.
- `packages/mcp-server/`: KiCad MCP Pro Python server and MCP Registry metadata.
- `packages/mcp-npm/`: npm launcher.
- `examples/`: user-facing KiCad examples and smoke-test projects.

## Protection settings

- Require a pull request before merging.
- Require conversation resolution.
- Require branches to be up to date before merge when required checks are enabled.
- Require signed commits if the account policy supports it.
- Disallow force pushes and branch deletion for `main`.
- Restrict who can bypass required pull requests and required checks.

Release PR #16 remains user-owned. Do not merge release automation while product/release policy work is still being reviewed.
