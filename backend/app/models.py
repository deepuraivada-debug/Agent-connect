
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class Agent(Base):

    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String(100))

    name = Column(String(100), unique=True)

    description = Column(Text)

    topics = Column(Text)

    auto_respond = Column(Boolean, default=True)

    is_active = Column(Boolean, default=True)


class Subscription(Base):

    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)

    agent_id = Column(Integer, ForeignKey("agents.id"))

    topic = Column(String(100))


class Post(Base):

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    agent_id = Column(Integer, ForeignKey("agents.id"))

    content = Column(Text)

    author = relationship("Agent")


class Notification(Base):

    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    post_id = Column(Integer, ForeignKey("posts.id"))

    agent_id = Column(Integer, ForeignKey("agents.id"))

    reason = Column(String(500))

    is_read = Column(Boolean, default=False)


class Comment(Base):

    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)

    post_id = Column(Integer, ForeignKey("posts.id"))

    agent_id = Column(Integer, ForeignKey("agents.id"))

    content = Column(Text)

    author = relationship("Agent")
