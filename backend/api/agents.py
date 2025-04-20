from datetime import datetime
from typing import Dict, List, Optional

from fastapi import APIRouter, HTTPException, Path
from models.agent import Agent, AgentCreate, AgentUpdate

router = APIRouter(tags=["agents"])

# In-memory storage for agents
# In a production app, this would be replaced with a database
agents_db: Dict[str, Agent] = {}


@router.post("/agents", response_model=Agent, status_code=201)
async def create_agent(agent: AgentCreate) -> Agent:
    """
    Create a new AI agent with a specified role/persona.

    Args:
        agent: The agent to create with name, role and optional fields

    Returns:
        The created agent with a generated ID

    Raises:
        HTTPException: If there's an issue creating the agent
    """
    current_time = datetime.now().isoformat()

    # Create a new Agent instance with the current time
    new_agent = Agent(**agent.dict(), created_at=current_time, updated_at=current_time)

    # Add to our in-memory database
    agents_db[new_agent.id] = new_agent

    return new_agent


@router.get("/agents", response_model=List[Agent])
async def list_agents() -> List[Agent]:
    """
    Get a list of all available agents.

    Returns:
        A list of all agents
    """
    return list(agents_db.values())


@router.get("/agents/{agent_id}", response_model=Agent)
async def get_agent(
    agent_id: str = Path(..., title="The ID of the agent to get")
) -> Agent:
    """
    Get a specific agent by its ID.

    Args:
        agent_id: The unique identifier of the agent

    Returns:
        The agent details

    Raises:
        HTTPException: If the agent is not found
    """
    if agent_id not in agents_db:
        raise HTTPException(
            status_code=404, detail=f"Agent with ID {agent_id} not found"
        )

    return agents_db[agent_id]


@router.put("/agents/{agent_id}", response_model=Agent)
async def update_agent(
    agent_update: AgentUpdate,
    agent_id: str = Path(..., title="The ID of the agent to update"),
) -> Agent:
    """
    Update an existing agent's details.

    Args:
        agent_update: The fields to update
        agent_id: The unique identifier of the agent to update

    Returns:
        The updated agent

    Raises:
        HTTPException: If the agent is not found
    """
    if agent_id not in agents_db:
        raise HTTPException(
            status_code=404, detail=f"Agent with ID {agent_id} not found"
        )

    # Get the existing agent
    agent = agents_db[agent_id]

    # Update only the fields that are provided
    update_data = agent_update.dict(exclude_unset=True)

    # Update the agent with the provided fields
    # Update the agent with the provided fields and validate
    updated_agent = agent.copy(
        update={**update_data, "updated_at": datetime.now().isoformat()}
    )

    # Save the updated agent
    agents_db[agent_id] = updated_agent
    return agent


@router.delete("/agents/{agent_id}", response_model=dict)
async def delete_agent(
    agent_id: str = Path(..., title="The ID of the agent to delete")
) -> dict:
    """
    Remove an agent by its ID.

    Args:
        agent_id: The unique identifier of the agent to delete

    Returns:
        A confirmation message

    Raises:
        HTTPException: If the agent is not found
    """
    if agent_id not in agents_db:
        raise HTTPException(
            status_code=404, detail=f"Agent with ID {agent_id} not found"
        )

    # Remove the agent from our in-memory database
    deleted_agent = agents_db.pop(agent_id)

    return {
        "message": f"Agent '{deleted_agent.name}' with ID {agent_id} deleted successfully"
    }
