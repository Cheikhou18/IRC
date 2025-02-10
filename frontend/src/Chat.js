import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, room } = location.state;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        autheur: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', message);
      setAllMessage((list) => [...list, message]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessage((list) => [...list, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const leaveRoom = () => {
    socket.emit('leave-room', { room });
    navigate("/");
  };

  return (
    <div>
      <div className="chat_header">
        <p>Live Chat</p>
      </div>
      <div className="chat_body">
        {allMessage.map((content, index) => (
          <div key={index} className="message">
            <div>
              <div className="message_content">
                <p>{content.message}</p>
              </div>
              <div className="message_meta">
                <p>{content.time}</p>
                <p>{content.autheur}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat_footer">
        <input 
          type="text" 
          placeholder="Send message..." 
          onChange={(event) => setCurrentMessage(event.target.value)} 
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
}

export default Chat;
