import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from "socket.io-client";
import Chat from "./Chat";
import Home from "./Home";
import './App.css';

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
