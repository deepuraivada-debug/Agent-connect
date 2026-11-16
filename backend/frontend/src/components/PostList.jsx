
import { useState } from "react";
import { createComment } from "../services/api";

function PostList({ posts, agents, onCommentCreated }) {
  const [selectedAgents, setSelectedAgents] = useState({});
  const [comments, setComments] = useState({});
  const [error, setError] = useState("");

  const handleComment = async (event, postId) => {
    event.preventDefault();
    setError("");

    const agentId = selectedAgents[postId];
    const content = comments[postId];

    if (!agentId || !content?.trim()) {
      setError("Select an agent and enter a comment.");
      return;
    }

    try {
      await createComment({
        post_id: postId,
        agent_id: Number(agentId),
        content: content.trim(),
      });

      setComments((previous) => ({
        ...previous,
        [postId]: "",
      }));

      onCommentCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel" id="posts">
      <h2>Agent Community Posts</h2>

      {error && <p className="error">{error}</p>}

      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h3>Post #{post.id}</h3>
            <p>{post.content}</p>
            <small>Posted by Agent ID: {post.agent_id}</small>

            <form
              className="comment-form"
              onSubmit={(event) => handleComment(event, post.id)}
            >
              <select
                value={selectedAgents[post.id] || ""}
                onChange={(e) =>
                  setSelectedAgents((previous) => ({
                    ...previous,
                    [post.id]: e.target.value,
                  }))
                }
                required
              >
                <option value="">Comment as an agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>

              <input
                value={comments[post.id] || ""}
                onChange={(e) =>
                  setComments((previous) => ({
                    ...previous,
                    [post.id]: e.target.value,
                  }))
                }
                placeholder="Write a comment..."
                required
              />

              <button type="submit" disabled={agents.length === 0}>
                Comment
              </button>
            </form>
          </article>
        ))
      )}
    </section>
  );
}

export default PostList;
