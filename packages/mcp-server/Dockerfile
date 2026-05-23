FROM python:3.12-slim@sha256:6026d9374020066a85690cabdb66f5d06a2dd606e756c7082fccdaaaf6d048dd AS builder

ARG UV_VERSION=0.11.12
ENV UV_NO_CACHE=1
WORKDIR /build

RUN python -m pip install --no-cache-dir --disable-pip-version-check --root-user-action=ignore "uv==${UV_VERSION}"
COPY pyproject.toml uv.lock README.md LICENSE ./
COPY src/ src/
RUN uv build --wheel --out-dir /dist \
  && uv export --frozen --no-dev --no-emit-project \
    --no-hashes \
    --format requirements.txt \
    --output-file /dist/requirements.txt

FROM python:3.12-slim@sha256:6026d9374020066a85690cabdb66f5d06a2dd606e756c7082fccdaaaf6d048dd AS runtime

ARG KICAD_MCP_VERSION=0.0.0
ARG VCS_REF=unknown
ARG KICAD_CLI_APT_PACKAGE=
ARG DEBIAN_FRONTEND=noninteractive

ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1 \
  KICAD_MCP_TRANSPORT=streamable-http \
  KICAD_MCP_HOST=127.0.0.1
WORKDIR /app

LABEL io.modelcontextprotocol.server.name="io.github.oaslananka/kicad-mcp-pro" \
  org.opencontainers.image.title="kicad-mcp-pro" \
  org.opencontainers.image.description="Professional MCP server for KiCad automation" \
  org.opencontainers.image.source="https://github.com/oaslananka/kicad-studio-kit" \
  org.opencontainers.image.version="${KICAD_MCP_VERSION}" \
  org.opencontainers.image.revision="${VCS_REF}" \
  org.opencontainers.image.licenses="MIT"

RUN apt-get update \
  && apt-get upgrade -y --no-install-recommends \
  && if [ -n "${KICAD_CLI_APT_PACKAGE}" ]; then apt-get install -y --no-install-recommends "${KICAD_CLI_APT_PACKAGE}"; fi \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system kicadmcp \
  && useradd --system --gid kicadmcp --home-dir /app --shell /usr/sbin/nologin kicadmcp

COPY --from=builder /dist/ /tmp/dist/
COPY docker-entrypoint.sh /usr/local/bin/kicad-mcp-pro-entrypoint
RUN python -m pip install --no-cache-dir --disable-pip-version-check --root-user-action=ignore \
    --requirement /tmp/dist/requirements.txt \
    /tmp/dist/*.whl \
  && rm -rf /tmp/dist \
  && chmod 0755 /usr/local/bin/kicad-mcp-pro-entrypoint

USER kicadmcp
EXPOSE 3334
ENTRYPOINT ["kicad-mcp-pro-entrypoint"]
CMD ["--transport", "streamable-http"]
