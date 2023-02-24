import React from 'react'
import { useNavigate } from "react-router-dom";

function UploadPicRoom() {
    const navigate = useNavigate();
    return (
      <div>
        Upload picture: <input type="file" />
        <button onClick={() => navigate('/waitingroom')}>Upload</button>
      </div>
    );
  }
  
export default UploadPicRoom;