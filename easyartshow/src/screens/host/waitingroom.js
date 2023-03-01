import React, { useState } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import { useNavigate } from "react-router-dom";

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const navigate = useNavigate();

  return (
    <div>
      Waiting Room
      <div>
        Your passcode is VGxhb4
        <br />
        <button onClick={() => navigate('/map')}>View map</button>
        <br />
        Share this passcode with your participants
        <br />
        <button onClick={() => navigate('/uploadpicroom')}>Upload picture</button>
        <div>
          <ArtBoard />
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
