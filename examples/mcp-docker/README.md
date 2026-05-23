# KiCad MCP Pro Docker Compose

This example runs the published `kicad-mcp-pro` container with streamable HTTP
on `127.0.0.1:3334`.

```bash
export KICAD_MCP_AUTH_TOKEN="replace-with-strong-32-character-token"
docker compose -f examples/mcp-docker/docker-compose.yml up
```

The default project mount points at `examples/led-basic`. To use another KiCad
project:

```bash
export KICAD_PROJECT_DIR="/absolute/path/to/kicad-project"
export KICAD_MCP_AUTH_TOKEN="replace-with-strong-32-character-token"
docker compose -f examples/mcp-docker/docker-compose.yml up
```

The MCP endpoint is `http://127.0.0.1:3334/mcp`.

For ChatGPT connector testing, expose the local endpoint through a trusted HTTPS
tunnel, set the connector URL to `https://<host>/mcp`, and configure bearer
token authentication with the same `KICAD_MCP_AUTH_TOKEN`.

Production deployments should pin `KICAD_MCP_IMAGE` to a version tag or digest:

```bash
export KICAD_MCP_IMAGE="ghcr.io/oaslananka/kicad-mcp-pro:<version>"
```
