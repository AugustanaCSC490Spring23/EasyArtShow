import React from 'react'
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
    return (
      <div>
        Are you a host or a participant?
        <button onClick={() => navigate('/login')}> 
            Host
        </button>
        <button> 
            participant
        </button>
      </div>
    );
  }
  
export default MainPage;