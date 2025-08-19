# ADK Tool

This directory contains the Google Agent Development Kit (ADK) project setup.

## Environment

A dedicated conda environment `learning_mcp_adk` has been created for this project with:

- **Python 3.11.13**
- **google-adk v1.9.0** - Google Agent Development Kit
- **litellm v1.75.0** - LLM interface library
- **mcp v1.12.3** - Model Context Protocol

## Quick Start

1. **Activate the environment:**
   ```bash
   conda activate learning_mcp_adk
   ```

2. **Test the installation:**
   ```bash
   python test_environment.py
   ```

3. **Test agent loading:**
   ```bash
   python test_agents.py
   ```

4. **Run an agent:**
   ```bash
   # Option 1: Using the simple launcher
   python launcher.py math_agent
   python launcher.py time_agent
   
   # Option 2: Using the server runner
   python run_server.py --agent math_agent --port 8080
   
   # Option 3: Using the direct starter
   python start_agent.py math_agent
   ```

## Troubleshooting

### YAML Configuration Error
If you encounter the error:
```
[WIP] _load_from_yaml_config: _load_from_yaml_config is not ready for use.
```

This is because the ADK is trying to use YAML configuration loading which is still work-in-progress. Use the provided scripts instead:

- `test_agents.py` - Test that agents load correctly
- `launcher.py` - Simple agent launcher
- `run_server.py` - Server runner with custom configuration
- `start_agent.py` - Direct agent starter

### Import Errors
Make sure you're in the correct conda environment:
```bash
conda activate learning_mcp_adk
```

### Missing .env Files
The agents now include `.env` files to avoid environment loading warnings.

## Files

- `requirements.txt` - Project dependencies
- `environment_setup.md` - Detailed setup instructions
- `test_environment.py` - Environment verification script
- `test_agents.py` - Agent loading verification script
- `launcher.py` - Simple agent launcher
- `run_server.py` - ADK server runner
- `start_agent.py` - Direct agent starter
- `config.py` - Project configuration
- `math_agent/` - Math agent implementation
- `time_agent/` - Time agent implementation

## Project Structure

```
adk-tool/
├── README.md                    # This file
├── requirements.txt             # Package dependencies
├── environment_setup.md         # Environment setup guide
├── test_environment.py          # Environment test script
├── test_agents.py              # Agent loading test script
├── launcher.py                 # Simple agent launcher
├── run_server.py               # ADK server runner
├── start_agent.py              # Direct agent starter
├── config.py                   # Project configuration
├── math_agent/
│   ├── __init__.py
│   ├── math_agent.py
│   └── .env                    # Environment variables
└── time_agent/
    ├── __init__.py
    ├── time_agent.py
    └── .env                    # Environment variables
```

## Notes

- The project uses a custom Nexus PyPI repository by default
- For installation, we bypass this using `--index-url https://pypi.org/simple/`
- All packages are successfully installed and verified working
- YAML configuration loading is avoided to prevent WIP errors

## Development

To start developing with this setup:

1. Activate the environment: `conda activate learning_mcp_adk`
2. Navigate to this directory: `cd /home/natanael/learning_mcp/adk-tool`
3. Test agent loading: `python test_agents.py`
4. Run an agent: `python launcher.py math_agent`

The environment includes all necessary Google Cloud AI Platform packages and MCP (Model Context Protocol) support for building intelligent agents.
