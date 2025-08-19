"""
ADK Configuration for the learning_mcp project.
This file provides proper agent configuration to avoid YAML loading issues.
"""

from pathlib import Path

# Project configuration
PROJECT_ROOT = Path(__file__).parent
AGENTS_DIR = PROJECT_ROOT

# Agent configurations
AGENTS = {
    "math_agent": {
        "module_path": "math_agent.math_agent",
        "agent_name": "root_agent",
        "description": "Agent to answer questions about mathematical queries using MCP tools",
        "directory": AGENTS_DIR / "math_agent"
    },
    "time_agent": {
        "module_path": "time_agent.time_agent", 
        "agent_name": "root_agent",
        "description": "Agent to answer questions about the current time in a city",
        "directory": AGENTS_DIR / "time_agent"
    }
}

def get_agent_config(agent_name: str):
    """Get configuration for a specific agent."""
    return AGENTS.get(agent_name)

def list_agents():
    """List all available agents."""
    return list(AGENTS.keys())
