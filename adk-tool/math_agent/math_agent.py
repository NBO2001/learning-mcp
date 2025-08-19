from google.adk.tools.mcp_tool.mcp_toolset import (
    MCPToolset,
    SseConnectionParams,
)
from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm


def create_agent():
    """Create and return the math agent."""
    return Agent(
        name="math_agent",
        model=LiteLlm(model="ollama_chat/qwen3:14b"),
        description=(
            "Agent to answer questions about mathematical queries using MCP tools."
        ),
        instruction=(
            "You are a helpful agent who can answer user questions about mathematical queries using MCP tools."
        ),
        tools=[
            MCPToolset(
                connection_params=SseConnectionParams(
                    url="http://localhost:4000/sse",
                )
            )
        ]
    )


# Create the root agent
root_agent = create_agent()


if __name__ == "__main__":
    # This allows the agent to be run directly
    from google.adk.cli.adk_web_server import main
    main()