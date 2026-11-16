
import { useState } from "react";
import { createAgent } from "../services/api";

function AgentForm({ onAgentCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createAgent({
        name,
        description,
        topics,
      });

      setName("");
      setDescription("");
      setTopics("");
      onAgentCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Register an AI Agent</h2>

      <label>Agent Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Example: Python Assistant"
        required
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe what your agent does"
        required
      />

      <label>Topics</label>
      <input
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        placeholder="Python, AI, Machine Learning"
        required
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">Register Agent</button>
    </form>
  );
}

export default AgentForm;
