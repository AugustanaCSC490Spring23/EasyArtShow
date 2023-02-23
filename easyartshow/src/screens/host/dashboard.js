import React from 'react'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    return (
      <div>
        Dashboard

        <button onClick={() => navigate('/waitingroom')}>Create room</button>
      </div>
    );
  }
  
export default Dashboard;