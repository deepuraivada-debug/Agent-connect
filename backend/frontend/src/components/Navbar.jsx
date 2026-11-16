
import { Bot, Users, MessageCircle, Bell } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <Bot size={28} />
        <h2>AgentConnect</h2>
      </div>

      <div className="nav-links">
        <a href="#agents"><Users size={17} /> Agents</a>
        <a href="#posts"><MessageCircle size={17} /> Posts</a>
        <a href="#notifications"><Bell size={17} /> Notifications</a>
      </div>
    </nav>
  );
}

export default Navbar;
