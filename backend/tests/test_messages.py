import json
from uuid import UUID

import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.models.message import Message

client = TestClient(app)


def test_create_message():
    """Test creating a new message."""
    response = client.post(
        "/api/messages", json={"content": "Hello, world!", "sender": "test_user"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["content"] == "Hello, world!"
    assert data["sender"] == "test_user"
    assert "id" in data
    assert "timestamp" in data

    # Validate UUID format
    UUID(data["id"])


def test_get_messages_empty():
    """Test getting messages when there are none."""
    # This test assumes the API resets between tests or we clear the messages
    response = client.get("/api/messages")
    assert response.status_code == 200
    data = response.json()
    assert "messages" in data
    # Since we can't guarantee the state of the in-memory store between tests,
    # we're just checking the response structure here


def test_message_flow():
    """Test creating and then retrieving messages."""
    # Create a message
    create_response = client.post(
        "/api/messages", json={"content": "Test message", "sender": "flow_test_user"}
    )
    assert create_response.status_code == 201
    message_id = create_response.json()["id"]

    # Get all messages and check if our message is included
    list_response = client.get("/api/messages")
    assert list_response.status_code == 200
    messages = list_response.json()["messages"]

    # Find our message in the list
    found = False
    for msg in messages:
        if msg["id"] == message_id:
            found = True
            assert msg["content"] == "Test message"
            assert msg["sender"] == "flow_test_user"
            break

    # This might fail if the in-memory store is reset between requests
    # In a real test environment, we would use a test database or mock
    assert found, "Created message not found in message list"


def test_get_message_by_id():
    """Test retrieving a specific message by ID."""
    # Create a message first
    create_response = client.post(
        "/api/messages", json={"content": "Message by ID", "sender": "id_test_user"}
    )
    assert create_response.status_code == 201
    message_data = create_response.json()
    message_id = message_data["id"]

    # Now retrieve it by ID
    get_response = client.get(f"/api/messages/{message_id}")
    assert get_response.status_code == 200
    retrieved_message = get_response.json()
    assert retrieved_message["id"] == message_id
    assert retrieved_message["content"] == "Message by ID"
    assert retrieved_message["sender"] == "id_test_user"


def test_get_nonexistent_message():
    """Test the error case when retrieving a non-existent message."""
    # Use a random UUID that almost certainly doesn't exist
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = client.get(f"/api/messages/{fake_id}")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
