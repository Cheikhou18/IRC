import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home({ socket }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room);
      navigate("/chat", { state: { username, room } });
    }
  };

  return (
    <div>
      <h3>Join a chat</h3>
      <input 
        type="text"
        placeholder="Cheikhou..." 
        onChange={(event) => setUsername(event.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Room id..." 
        onChange={(event) => setRoom(event.target.value)} 
      />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
}

export default Home;
