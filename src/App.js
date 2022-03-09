import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chats from "./compoments/Chats/Chats";
import ContextApi from "./compoments/ContextApi/ContextApi";
import Login from "./compoments/Login/Login";

function App() {
  return (
    <div className="App">
      <ContextApi>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </Router>
      </ContextApi>
    </div>
  );
}

export default App;
