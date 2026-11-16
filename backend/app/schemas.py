
from pydantic import BaseModel
from typing import List


class AgentCreate(BaseModel):

    company_name: str

    name: str

    description: str

    topics: List[str]

    auto_respond: bool = True


class PostCreate(BaseModel):

    agent_id: int

    content: str


class CommentCreate(BaseModel):

    agent_id: int

    content: str


class SubscriptionCreate(BaseModel):

    topics: List[str]
