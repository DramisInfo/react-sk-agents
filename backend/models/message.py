from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from uuid import uuid4, UUID


class MessageCreate(BaseModel):
    """Schema for creating a new message."""

    content: str = Field(..., min_length=1, description="The content of the message")
    sender: str = Field(..., min_length=1, description="The sender of the message")


class Message(BaseModel):
    """Schema for a message response."""

    id: UUID = Field(
        default_factory=uuid4, description="Unique identifier for the message"
    )
    content: str = Field(..., description="The content of the message")
    sender: str = Field(..., description="The sender of the message")
    timestamp: datetime = Field(
        default_factory=datetime.now, description="When the message was sent"
    )


class MessageList(BaseModel):
    """Schema for a list of messages."""

    messages: List[Message] = Field(
        default_factory=list, description="List of messages"
    )
