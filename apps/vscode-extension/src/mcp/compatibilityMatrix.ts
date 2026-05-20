export const COMPATIBILITY_MATRIX = {
  schemaVersion: 1,
  kicad: {
    primary: '10.0.x',
    supported: ['10.0.x', '9.x', '8.x'],
    deprecated: ['8.x']
  },
  mcp: {
    protocolVersion: '2025-11-25',
    toolSchema: '1.0'
  },
  products: {
    kicadStudio: {
      version: '1.0.0',
      compatibleMcpPro: {
        required: '>=1.0.0 <2.0.0',
        recommended: '>=1.0.0 <2.0.0',
        testedAgainst: '1.0.0'
      }
    },
    kicadMcpPro: {
      version: '1.0.0',
      compatibleExtension: {
        required: '>=1.0.0 <2.0.0',
        testedAgainst: '1.0.0'
      }
    }
  }
} as const;

export const MCP_PROTOCOL_VERSION = COMPATIBILITY_MATRIX.mcp.protocolVersion;
