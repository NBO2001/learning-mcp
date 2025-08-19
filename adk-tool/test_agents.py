#!/usr/bin/env python3
"""
Test script to verify agents can be loaded without YAML configuration errors.
"""

import sys
from pathlib import Path

# Add current directory to path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

def test_agent_loading():
    """Test that agents can be loaded properly."""
    
    print("Testing agent loading...")
    
    try:
        # Test math agent loading
        print("Loading math agent...")
        from math_agent import root_agent as math_agent
        print(f"✅ Math agent loaded successfully: {math_agent.name}")
        
        # Test time agent loading  
        print("Loading time agent...")
        from time_agent import root_agent as time_agent
        print(f"✅ Time agent loaded successfully: {time_agent.name}")
        
        print("\n🎉 All agents loaded successfully!")
        print("You can now run them using:")
        print("  python launcher.py math_agent")
        print("  python launcher.py time_agent")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading agents: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    test_agent_loading()
