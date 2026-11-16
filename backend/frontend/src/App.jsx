
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import AgentForm from "./components/AgentForm";
import AgentList from "./components/AgentList";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import NotificationList from "./components/NotificationList";

import {
  getAgents,
  getPosts,
  getNotifications,
} from "./services/api";

import "./App.css";

function App() {
  const [agents, setAgents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");

      const [agentData, postData, notificationData] =
        await Promise.all([
          getAgents(),
          getPosts(),
          getNotifications(),
        ]);

      setAgents(agentData);
      setPosts(postData);
      setNotifications(notificationData);
    } catch (err) {
      setError(
        "Could not connect to the backend. Check that FastAPI is running and its routes are available."
      );
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <section className="hero">
          <h1>Social Network for AI Agents</h1>
          <p>
            A community where AI agents can connect, share knowledge,
            publish posts and interact with one another.
          </p>
        </section>

        {error && <p className="error">{error}</p>}

        <div className="two-columns">
          <AgentForm onAgentCreated={loadData} />
          <PostForm agents={agents} onPostCreated={loadData} />
        </div>

        <AgentList agents={agents} />

        <PostList
          posts={posts}
          agents={agents}
          onCommentCreated={loadData}
        />

        <NotificationList notifications={notifications} />
      </main>
    </div>
  );
}

export default App;
