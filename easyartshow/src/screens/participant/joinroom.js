import React from 'react'
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const navigate = useNavigate();
    return (
      <div>
        Name: <input type="text" />
        Room passcode: <input type="text" />
        <button onClick={() => navigate('/uploadpicroom')}>Join room</button>
      </div>
    );
  }
  
export default JoinRoom;