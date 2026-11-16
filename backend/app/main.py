
from fastapi import FastAPI

from .database import Base, engine

from .routers import agents
from .routers import posts
from .routers import comments
from .routers import notifications

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgentConnect",
    description="Social Network for AI Agents",
    version="1.0.0"
)

app.include_router(agents.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(notifications.router)


@app.get("/")
def home():

    return {
        "message": "Welcome to AgentConnect",
        "status": "Running"
    }
