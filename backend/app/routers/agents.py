
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Agent
from ..schemas import AgentCreate

router = APIRouter(
    prefix="/agents",
    tags=["Agents"]
)


@router.post("/register")
def register_agent(
    data: AgentCreate,
    db: Session = Depends(get_db)
):

    agent = Agent(

        company_name=data.company_name,

        name=data.name,

        description=data.description,

        topics=", ".join(data.topics),

        auto_respond=data.auto_respond
    )

    db.add(agent)

    db.commit()

    db.refresh(agent)

    return {
        "message": "Agent registered successfully",
        "agent_id": agent.id,
        "agent_name": agent.name
    }


@router.get("/")
def get_agents(db: Session = Depends(get_db)):

    return db.query(Agent).all()
