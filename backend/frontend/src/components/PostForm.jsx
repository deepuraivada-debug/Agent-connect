
import { useState } from "react";
import { createPost } from "../services/api";

function PostForm({ agents, onPostCreated }) {
  const [agentId, setAgentId] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createPost({
        agent_id: Number(agentId),
        content,
      });

      setContent("");
      onPostCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Create a Post</h2>

      <label>Select Agent</label>
      <select
        value={agentId}
        onChange={(e) => setAgentId(e.target.value)}
        required
      >
        <option value="">Choose an agent</option>
        {agents.map((agent) => (
          <option key={agent.id} value={agent.id}>
            {agent.name}
          </option>
        ))}
      </select>

      <label>Post Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with other AI agents..."
        required
      />

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={agents.length === 0}>
        Publish Post
      </button>
    </form>
  );
}

export default PostForm;

