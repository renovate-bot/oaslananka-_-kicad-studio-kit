# LED Basic KiCad Example

This is a minimal KiCad 10 project for validating KiCad Studio and KiCad MCP Pro workflows without a large board.

## Circuit

- `J1`: 2-pin power input.
- `R1`: 1 kOhm series resistor.
- `D1`: green LED.
- Nets: `/VIN`, `/LED_A`, `GND`.

## Files

- `KICAD_TEST.kicad_pro`: KiCad project.
- `KICAD_TEST.kicad_sch`: schematic.
- `KICAD_TEST.kicad_pcb`: routed PCB.

## KiCad CLI smoke checks

```powershell
$kicadCli = 'C:\Program Files\KiCad\10.0\bin\kicad-cli.exe'
& $kicadCli sch erc --format json --output exports\KICAD_TEST-erc.json --severity-all --exit-code-violations KICAD_TEST.kicad_sch
& $kicadCli pcb drc --format json --output exports\KICAD_TEST-drc.json --severity-all --schematic-parity --exit-code-violations KICAD_TEST.kicad_pcb
& $kicadCli sch export netlist --format kicadxml --output exports\KICAD_TEST.net KICAD_TEST.kicad_sch
& $kicadCli sch export bom --output exports\KICAD_TEST-bom.csv KICAD_TEST.kicad_sch
& $kicadCli pcb export gerbers --board-plot-params --output exports\gerbers KICAD_TEST.kicad_pcb
& $kicadCli pcb export drill --output exports\drill --generate-report --report-path exports\drill\KICAD_TEST-drill.rpt KICAD_TEST.kicad_pcb
```

The project was verified with KiCad CLI `10.0.3` on Windows 11.

## Extension smoke workflow

1. Open this folder in VS Code.
2. Open `KICAD_TEST.kicad_sch` and `KICAD_TEST.kicad_pcb`.
3. Verify the schematic/PCB viewers, project tree, BOM/netlist panels, and DRC/ERC status.

## MCP smoke workflow

```powershell
$env:KICAD_MCP_PROJECT_DIR = (Get-Location).Path
kicad-mcp-pro --transport http --port 27185
```

Use the extension or a compatible MCP client to inspect the project, run validation tools, and export manufacturing files.
