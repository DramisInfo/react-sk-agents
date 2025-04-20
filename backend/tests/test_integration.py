"""Integration tests for the backend API endpoints."""

import json
import os
# Direct import from main module which will be accessible in the CI environment
import sys
from uuid import UUID

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

client = TestClient(app)


def test_health_endpoint():
    """Test health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_echo_endpoint():
    """Test echo endpoint."""
    test_message = {"message": "test message"}
    response = client.post("/api/echo", json=test_message)
    assert response.status_code == 200
    assert response.json() == test_message


def test_message_api_flow():
    """Test the full message API flow (create, list, get by ID)."""
    # 1. Create a new message
    new_message = {"content": "Integration test message", "sender": "integration_test"}
    create_response = client.post("/api/messages", json=new_message)
    assert create_response.status_code == 201
    message_data = create_response.json()

    # Validate message structure
    assert message_data["content"] == new_message["content"]
    assert message_data["sender"] == new_message["sender"]
    assert "id" in message_data
    assert "timestamp" in message_data

    message_id = message_data["id"]

    # 2. Get message by ID
    get_response = client.get(f"/api/messages/{message_id}")
    assert get_response.status_code == 200
    assert get_response.json()["id"] == message_id

    # 3. List all messages
    list_response = client.get("/api/messages")
    assert list_response.status_code == 200
    messages = list_response.json()["messages"]

    # Find our message in the list
    matching_messages = [msg for msg in messages if msg["id"] == message_id]
    assert len(matching_messages) == 1
    assert matching_messages[0]["content"] == new_message["content"]


def test_nonexistent_message():
    """Test requesting a message that doesn't exist."""
    response = client.get("/api/messages/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
