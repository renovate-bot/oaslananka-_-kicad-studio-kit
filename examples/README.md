# Examples

Examples are user-facing KiCad projects for extension, MCP, documentation, screenshot, and smoke-test workflows. They are intentionally separate from deterministic automated fixtures.

| Example                            | Purpose                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [led-basic](led-basic/README.md)   | Small KiCad 10 LED schematic and routed PCB for viewer, ERC/DRC, BOM, netlist, manufacturing export, and MCP smoke tests |
| [mcp-docker](mcp-docker/README.md) | Docker Compose example for running `kicad-mcp-pro` over streamable HTTP with a read-only KiCad project mount             |

Generated outputs such as Gerbers, drill files, reports, screenshots, and local MCP logs should stay outside git unless a future release smoke workflow explicitly needs them.
