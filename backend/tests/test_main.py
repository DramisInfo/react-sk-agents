from fastapi.testclient import TestClient
from backend.main import app


def test_health_check():
    client = TestClient(app)
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_echo_message():
    client = TestClient(app)
    payload = {"message": "Hello, world!"}
    response = client.post("/api/echo", json=payload)
    assert response.status_code == 200
    assert response.json() == payload
