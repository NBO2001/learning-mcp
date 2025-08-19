#!/usr/bin/env python3
"""
ADK Agent Launcher
This script helps launch ADK agents without triggering YAML configuration loading issues.
"""

import sys
import os
from pathlib import Path

# Add the current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def run_math_agent():
    """Run the math agent."""
    print("Starting math agent...")
    os.chdir(current_dir / "math_agent")
    
    # Import and run the agent
    from math_agent.math_agent import root_agent
    
    # Start the ADK web server with this agent
    from google.adk.cli.adk_web_server import AdkWebServer
    
    server = AdkWebServer()
    server.run_agent(root_agent)

def run_time_agent():
    """Run the time agent."""
    print("Starting time agent...")
    os.chdir(current_dir / "time_agent")
    
    # Import and run the agent
    from time_agent.time_agent import root_agent
    
    # Start the ADK web server with this agent
    from google.adk.cli.adk_web_server import AdkWebServer
    
    server = AdkWebServer()
    server.run_agent(root_agent)

def main():
    """Main launcher function."""
    if len(sys.argv) < 2:
        print("Usage: python launcher.py <agent_name>")
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
