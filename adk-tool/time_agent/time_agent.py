from google.adk.models.lite_llm import LiteLlm
import datetime
from zoneinfo import ZoneInfo
from google.adk.agents import Agent

def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city.

    Args:
        city (str): The name of the city for which to retrieve the current time.

    Returns:
        dict: status and result or error msg.
    """
    try:
        tz_identifier = ZoneInfo(city)
        now = datetime.datetime.now(tz_identifier)
        report = (
            f'The current time in {city} is {now.strftime("%Y-%m-%d %H:%M:%S %Z%z")}'
        )
        return {"status": "success", "report": report}
    except Exception as e:
        return {
            "status": "error",
            "error_message": (
                f"Failed to retrieve timezone information for {city}. Error: {str(e)}"
            ),
        }


def create_agent():
    """Create and return the time agent."""
    return Agent(
        name="time_agent",
        model=LiteLlm(model="ollama_chat/qwen3:14b"),
        description=(
            "Agent to answer questions about the current time in a city."
        ),
        instruction=(
            "You are a helpful agent who can answer user questions about the current time in a city."
        ),
        tools=[get_current_time]
    )


# Create the root agent
root_agent = create_agent()


if __name__ == "__main__":
    # This allows the agent to be run directly
    from google.adk.cli.adk_web_server import main
    main()