#!/usr/bin/env python3
"""
Simple ADK server runner that avoids YAML configuration issues.
"""

import os
import sys
from pathlib import Path

# Add current directory to Python path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def run_adk_server(agent_name="math_agent", port=8080):
    """Run the ADK server with the specified agent."""
    
    # Change to the agent directory
    agent_dir = current_dir / agent_name
    if not agent_dir.exists():
        print(f"Error: Agent directory '{agent_name}' not found")
        return False
    
    os.chdir(agent_dir)
    
    try:
        if agent_name == "math_agent":
            from math_agent import root_agent
        elif agent_name == "time_agent":
            from time_agent import root_agent
        else:
            print(f"Error: Unknown agent '{agent_name}'")
            return False
        
        print(f"Starting ADK server for {agent_name} on port {port}...")
        print(f"Agent: {root_agent.name}")
        print(f"Description: {root_agent.description}")
        
        # Start the ADK web server
        from google.adk.cli.adk_web_server import AdkWebServer
        
        # Create server instance
        server = AdkWebServer()
        
        # Set the agent directly to avoid loading issues
        server._agents = {agent_name: root_agent}
        
        # Start the server
        import uvicorn
        uvicorn.run(
            server.app,
            host="0.0.0.0",
            port=port,
            log_level="info"
        )
        
    except Exception as e:
        print(f"Error starting server: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main function."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Run ADK agent server")
    parser.add_argument("--agent", default="math_agent", 
                       choices=["math_agent", "time_agent"],
                       help="Agent to run")
    parser.add_argument("--port", type=int, default=8080,
                       help="Port to run server on")
    
    args = parser.parse_args()
    
    run_adk_server(args.agent, args.port)

if __name__ == "__main__":
    main()
