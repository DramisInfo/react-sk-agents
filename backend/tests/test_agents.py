import os
import sys

import pytest
from fastapi.testclient import TestClient

# Add the parent directory to the path so we can import from backend modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)


def test_create_agent():
    """Test creating a new agent."""
    agent_data = {
        "name": "Test Agent",
        "role": "I am a test agent",
        "description": "Agent for testing",
        "metadata": {"type": "test"},
    }

    response = client.post("/api/agents", json=agent_data)
    assert response.status_code == 201

    created_agent = response.json()
    assert created_agent["name"] == agent_data["name"]
    assert created_agent["role"] == agent_data["role"]
    assert created_agent["description"] == agent_data["description"]
    assert created_agent["metadata"] == agent_data["metadata"]
    assert "id" in created_agent
    assert "created_at" in created_agent
    assert "updated_at" in created_agent


def test_list_agents():
    """Test listing all agents."""
    # Create an agent first to ensure we have at least one
    agent_data = {
        "name": "List Test Agent",
        "role": "I am a list test agent",
    }
    client.post("/api/agents", json=agent_data)

    # Get the list of agents
    response = client.get("/api/agents")
    assert response.status_code == 200

    agents = response.json()
    assert isinstance(agents, list)
    assert len(agents) > 0


def test_get_agent():
    """Test getting a specific agent by ID."""
    # Create an agent first
    agent_data = {
        "name": "Get Test Agent",
        "role": "I am a get test agent",
    }
    create_response = client.post("/api/agents", json=agent_data)
    created_agent = create_response.json()
    agent_id = created_agent["id"]

    # Get the agent by ID
    response = client.get(f"/api/agents/{agent_id}")
    assert response.status_code == 200

    agent = response.json()
    assert agent["id"] == agent_id
    assert agent["name"] == agent_data["name"]
    assert agent["role"] == agent_data["role"]


def test_get_nonexistent_agent():
    """Test getting an agent that doesn't exist."""
    response = client.get("/api/agents/nonexistent-id")
    assert response.status_code == 404


def test_update_agent():
    """Test updating an agent."""
    # Create an agent first
    agent_data = {
        "name": "Update Test Agent",
        "role": "I am an update test agent",
    }
    create_response = client.post("/api/agents", json=agent_data)
    created_agent = create_response.json()
    agent_id = created_agent["id"]

    # Update the agent
    update_data = {"name": "Updated Agent Name", "description": "New description"}
    response = client.put(f"/api/agents/{agent_id}", json=update_data)
    assert response.status_code == 200

    updated_agent = response.json()
    assert updated_agent["id"] == agent_id
    assert updated_agent["name"] == update_data["name"]
    assert updated_agent["role"] == agent_data["role"]  # Unchanged
    assert updated_agent["description"] == update_data["description"]


def test_update_nonexistent_agent():
    """Test updating an agent that doesn't exist."""
    update_data = {"name": "New Name"}
    response = client.put("/api/agents/nonexistent-id", json=update_data)
    assert response.status_code == 404


def test_delete_agent():
    """Test deleting an agent."""
    # Create an agent first
    agent_data = {
        "name": "Delete Test Agent",
        "role": "I am a delete test agent",
    }
    create_response = client.post("/api/agents", json=agent_data)
    created_agent = create_response.json()
    agent_id = created_agent["id"]

    # Delete the agent
    response = client.delete(f"/api/agents/{agent_id}")
    assert response.status_code == 200

    # Verify it's deleted
    get_response = client.get(f"/api/agents/{agent_id}")
    assert get_response.status_code == 404


def test_delete_nonexistent_agent():
    """Test deleting an agent that doesn't exist."""
    response = client.delete("/api/agents/nonexistent-id")
    assert response.status_code == 404


def test_validation_empty_role():
    """Test validation for empty role."""
    agent_data = {
        "name": "Invalid Agent",
        "role": "",
    }
    response = client.post("/api/agents", json=agent_data)
    assert response.status_code == 422  # Validation error
