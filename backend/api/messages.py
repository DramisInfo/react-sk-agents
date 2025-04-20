from datetime import datetime
from typing import List
from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from models.message import Message, MessageCreate, MessageList

router = APIRouter(tags=["messages"])

# In-memory storage for messages
# In a real application, this would be replaced with a database
_messages: List[Message] = []


@router.post("/messages", response_model=Message, status_code=status.HTTP_201_CREATED)
async def create_message(message: MessageCreate) -> Message:
    """
    Create a new chat message.

    Args:
        message: The message data to create

    Returns:
        The created message with generated ID and timestamp
    """
    new_message = Message(
        content=message.content, sender=message.sender, timestamp=datetime.now()
    )
    _messages.append(new_message)
    return new_message


@router.get("/messages", response_model=MessageList)
async def get_messages() -> MessageList:
    """
    Retrieve all chat messages.

    Returns:
        A list of all messages
    """
    return MessageList(messages=_messages)


@router.get("/messages/{message_id}", response_model=Message)
async def get_message(message_id: UUID) -> Message:
    """
    Retrieve a specific message by its ID.

    Args:
        message_id: The unique identifier of the message

    Returns:
        The requested message

    Raises:
        HTTPException: If the message is not found
    """
    for message in _messages:
        if message.id == message_id:
            return message

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Message with ID {message_id} not found",
    )
