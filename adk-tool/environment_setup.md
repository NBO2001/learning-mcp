# Environment Setup for Google ADK Project

## Created conda environment: `learning_mcp_adk`

### Environment Details:
- **Environment Name**: learning_mcp_adk
- **Python Version**: 3.11.13
- **Location**: `/home/natanael/anaconda3/envs/learning_mcp_adk`

### Installation Steps:

1. **Create conda environment:**
   ```bash
   conda create -n learning_mcp_adk python=3.11 -y
   ```

2. **Activate the environment:**
   ```bash
   conda activate learning_mcp_adk
   ```

3. **Install packages:**
   ```bash
   pip install --index-url https://pypi.org/simple/ -r requirements.txt
   ```
   
   Or install individually:
   ```bash
   pip install --index-url https://pypi.org/simple/ google-adk litellm
   ```

### Package Information:

#### Installed Packages:
- **google-adk** (v1.9.0) - Google Agent Development Kit
- **litellm** (v1.75.0) - LLM interface library

#### Key Dependencies:
- google-cloud-aiplatform (v1.107.0)
- google-cloud-storage (v2.19.0)
- google-genai (v1.29.0)
- mcp (v1.12.3) - Model Context Protocol
- fastapi (v0.116.1)
- uvicorn (v0.35.0)
- pydantic (v2.11.7)
- And many more...

### Usage:

To activate this environment for future work:
```bash
conda activate learning_mcp_adk
```

To verify installation:
```bash
python -c "import google.adk; import litellm; print('Both packages imported successfully!')"
```

### Notes:

- The original PyPI configuration uses a custom Nexus repository that requires authentication
- We bypassed this by using the standard PyPI index: `--index-url https://pypi.org/simple/`
- This environment is specifically configured for this Google ADK project

### Troubleshooting:

If you encounter authentication issues with the default pip configuration, always use:
```bash
pip install --index-url https://pypi.org/simple/ <package_name>
```
