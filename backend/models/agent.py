import uuid
from typing import Dict, Optional

from pydantic import BaseModel, Field, validator


class Agent(BaseModel):
    """
    Pydantic model for an AI chat agent.
    """

    id: str = Field(
        default_factory=lambda: str(uuid.uuid4()),
        description="Unique identifier for the agent",
    )
    name: str = Field(
        ..., min_length=1, max_length=100, description="Name of the agent"
    )
    role: str = Field(..., min_length=1, description="Role or persona of the agent")
    description: Optional[str] = Field(
        None, description="Optional description of the agent"
    )
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    metadata: Dict[str, str] = Field(
        default_factory=dict, description="Additional metadata for the agent"
    )

    @validator("role")
    def role_not_empty(cls, v):
        """Validate that role is not empty."""
        v = v.strip()
        if not v:
            raise ValueError("Role cannot be empty")
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Programming Assistant",
                "role": "I am an AI programming assistant. I can help with coding tasks, explain concepts, and suggest best practices.",
                "description": "Programming and development assistant",
                "metadata": {"specialty": "Python", "experience_level": "expert"},
            }
        }


class AgentCreate(BaseModel):
    """
    Pydantic model for creating a new agent.
    """

    name: str = Field(
        ..., min_length=1, max_length=100, description="Name of the agent"
    )
    role: str = Field(..., min_length=1, description="Role or persona of the agent")
    description: Optional[str] = Field(
        None, description="Optional description of the agent"
    )
    metadata: Dict[str, str] = Field(
        default_factory=dict, description="Additional metadata for the agent"
    )

    @validator("role")
    def role_not_empty(cls, v):
        """Validate that role is not empty."""
        v = v.strip()
        if not v:
            raise ValueError("Role cannot be empty")
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Programming Assistant",
                "role": "I am an AI programming assistant. I can help with coding tasks, explain concepts, and suggest best practices.",
                "description": "Programming and development assistant",
                "metadata": {"specialty": "Python", "experience_level": "expert"},
            }
        }


class AgentUpdate(BaseModel):
    """
    Pydantic model for updating an existing agent.
    """

    name: Optional[str] = Field(
        None, min_length=1, max_length=100, description="Name of the agent"
    )
    role: Optional[str] = Field(
        None, min_length=1, description="Role or persona of the agent"
    )
    description: Optional[str] = Field(
        None, description="Optional description of the agent"
    )
    metadata: Optional[Dict[str, str]] = Field(
        None, description="Additional metadata for the agent"
    )

    @validator("role")
    def role_not_empty(cls, v):
        """Validate that role is not empty if provided."""
        if v is not None:
            v = v.strip()
            if not v:
                raise ValueError("Role cannot be empty")
        return v
