from __future__ import annotations

from kicad_mcp.compatibility import COMPATIBILITY_MATRIX, MCP_PROTOCOL_VERSION
from scripts.check_compatibility_matrix import validate_compatibility_matrix


def test_embedded_compatibility_metadata_declares_current_contract() -> None:
    assert COMPATIBILITY_MATRIX["mcp"]["protocolVersion"] == MCP_PROTOCOL_VERSION
    assert COMPATIBILITY_MATRIX["kicad"]["primary"] == "10.0.x"
    assert (
        COMPATIBILITY_MATRIX["products"]["kicad-studio"]["compatibleMcpPro"]["required"]
        == ">=1.0.0 <2.0.0"
    )


def test_repository_compatibility_matrix_has_no_drift() -> None:
    assert validate_compatibility_matrix() == []
