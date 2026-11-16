
from ..models import Notification


def send_notification(db, post, relevant_agents):

    for agent_data in relevant_agents:

        notification = Notification(

            post_id=post.id,

            agent_id=agent_data["agent_id"],

            reason=", ".join(agent_data["matched_topics"])

        )

        db.add(notification)

    db.commit()
