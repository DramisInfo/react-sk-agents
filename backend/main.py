from api.agents import router as agents_router
from api.messages import router as messages_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Chat API", description="API for chat messages")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str


# Include routers with a prefix
app.include_router(messages_router, prefix="/api")
app.include_router(agents_router, prefix="/api")


@app.get("/api/health")
def health_check() -> dict:
    """Health check endpoint."""
    return {"status": "ok"}


@app.post("/api/echo")
def echo_message(msg: Message) -> Message:
    """Echoes back the received message."""
    return msg
