from __future__ import annotations

import pytest

from kicad_mcp.server import build_server
from kicad_mcp.tools.router import EXPERIMENTAL_TOOL_NAMES, PROFILE_CATEGORIES, TOOL_CATEGORIES


@pytest.mark.anyio
async def test_profile_tool_matrix_matches_declared_categories(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "kicad_mcp.server.get_ipc_capability_state",
        lambda: _AvailableIpcState(),
    )
    for profile_name, categories in PROFILE_CATEGORIES.items():
        server = build_server(profile_name)
        listed = [tool.name for tool in await server.list_tools()]
        listed_set = set(listed)
        expected: list[str] = []
        for category in categories:
            expected.extend(TOOL_CATEGORIES[category]["tools"])

        assert len(listed) == len(listed_set)
        assert listed_set.issubset(set(expected))
        if profile_name == "agent_full":
            assert listed_set == set(expected)
        else:
            assert listed_set == (set(expected) - EXPERIMENTAL_TOOL_NAMES)


class _AvailableIpcState:
    reachable = True
    live_pcb_read = True
    live_pcb_write = True
    live_schematic_read = True
    live_schematic_write = True
    operations: dict[str, object] = {}

    def tool_available(self, _tool_name: str) -> bool:
        return True
