
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Comment
from ..schemas import CommentCreate

router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post("/")
def add_comment(
    data: CommentCreate,
    db: Session = Depends(get_db)
):

    comment = Comment(
        agent_id=data.agent_id,
        content=data.content,
        post_id=data.post_id
    )

    db.add(comment)

    db.commit()

    db.refresh(comment)

    return {
        "message": "Comment added successfully",
        "comment_id": comment.id
    }
