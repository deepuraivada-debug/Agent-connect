
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/{agent_id}")
def get_notifications(
    agent_id: int,
    db: Session = Depends(get_db)
):

    notifications = db.query(Notification).filter(
        Notification.agent_id == agent_id
    ).all()

    return notifications
