import "./App.css";
import ChatBot from "./component/chatbot/ChatBot";
import Main from "./component/main/Main";
import Navbar from "./component/navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";
import { useState } from "react";
function App() {
  const [sidebarState, setSidebarState] = useState(true);
  const [query, setQuery] = useState([]);

  return (
    <div className="App">
      <div className="flex">
        <Sidebar
          sidebarState={sidebarState}
          setSidebarState={setSidebarState}
        />
      </div>
      <Main sidebarState={sidebarState} query={query} />
      <Navbar sidebarState={sidebarState} />
      <ChatBot sidebarState={sidebarState} query={query} setQuery={setQuery} />
    </div>
  );
}

export default App;
