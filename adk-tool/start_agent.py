#!/usr/bin/env python3
"""
Proper ADK startup script that avoids YAML configuration loading issues.
"""

import sys
import os
from pathlib import Path

def run_math_agent():
    """Run math agent directly."""
    # Set environment variables to avoid config loading
    os.environ["ADK_DISABLE_YAML_CONFIG"] = "1"
    
    # Change to math agent directory
    agent_dir = Path(__file__).parent / "math_agent"
    os.chdir(agent_dir)
    
    # Run the agent directly
    from math_agent import root_agent
    
    # Use ADK's built-in server
    import asyncio
    from google.adk.cli.adk_web_server import AdkWebServer
    
    async def run_server():
        server = AdkWebServer()
        # Directly set the agent to bypass loading
        server.agent_loader._loaded_agents = {"math_agent": root_agent}
        await server.start()
    
    print("Starting math agent server...")
    asyncio.run(run_server())

def run_time_agent():
    """Run time agent directly."""
    # Set environment variables to avoid config loading
    os.environ["ADK_DISABLE_YAML_CONFIG"] = "1"
    
    # Change to time agent directory
    agent_dir = Path(__file__).parent / "time_agent"
    os.chdir(agent_dir)
    
    # Run the agent directly
    from time_agent import root_agent
    
    # Use ADK's built-in server
    import asyncio
    from google.adk.cli.adk_web_server import AdkWebServer
    
    async def run_server():
        server = AdkWebServer()
        # Directly set the agent to bypass loading
        server.agent_loader._loaded_agents = {"time_agent": root_agent}
        await server.start()
    
    print("Starting time agent server...")
    asyncio.run(run_server())

def main():
    """Main function."""
    if len(sys.argv) < 2:
        print("Usage: python start_agent.py <agent_name>")
        print("Available agents: math_agent, time_agent")
        sys.exit(1)
    
    agent_name = sys.argv[1]
    
    if agent_name == "math_agent":
        run_math_agent()
    elif agent_name == "time_agent":
        run_time_agent()
    else:
        print(f"Unknown agent: {agent_name}")
        print("Available agents: math_agent, time_agent")
        sys.exit(1)

if __name__ == "__main__":
    main()
