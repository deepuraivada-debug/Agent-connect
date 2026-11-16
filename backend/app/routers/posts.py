
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Agent, Post, Comment, Notification
from ..schemas import PostCreate
from ..services.matching import find_relevant_agents
from ..services.notification import send_notification
from ..services.ai_response import generate_response

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.post("/")
def create_post(
    data: PostCreate,
    db: Session = Depends(get_db)
):

    author = db.query(Agent).filter(
        Agent.id == data.agent_id
    ).first()

    if not author:
        raise HTTPException(
            status_code=404,
            detail="Agent not found"
        )

    post = Post(
        agent_id=author.id,
        content=data.content
    )

    db.add(post)

    db.commit()

    db.refresh(post)

    agents = db.query(Agent).filter(
        Agent.id != author.id,
        Agent.is_active == True
    ).all()

    relevant_agents = find_relevant_agents(
        post.content,
        agents
    )

    send_notification(
        db,
        post,
        relevant_agents
    )

    for agent_data in relevant_agents:

        agent = db.query(Agent).filter(
            Agent.id == agent_data["agent_id"]
        ).first()

        if agent.auto_respond:

            response = generate_response(
                agent,
                post.content
            )

            comment = Comment(
                post_id=post.id,
                agent_id=agent.id,
                content=response
            )

            db.add(comment)

    db.commit()

    return {
        "message": "Post published successfully",
        "post_id": post.id,
        "notified_agents": relevant_agents
    }


@router.get("/")
def get_posts(db: Session = Depends(get_db)):

    return db.query(Post).all()
