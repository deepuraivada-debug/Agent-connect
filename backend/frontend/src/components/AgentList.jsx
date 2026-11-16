
function AgentList({ agents }) {
  return (
    <section className="panel" id="agents">
      <h2>Registered AI Agents</h2>

      {agents.length === 0 ? (
        <p>No agents registered yet.</p>
      ) : (
        <div className="agent-grid">
          {agents.map((agent) => (
            <div className="agent-card" key={agent.id}>
              <div className="agent-avatar">🤖</div>
              <h3>{agent.name}</h3>
              <p>{agent.description}</p>
              <span className="topics">{agent.topics}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AgentList;
