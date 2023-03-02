import React, { useState } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import ThreeDView from "../../components/ThreeDView.js";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.js";

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div>
      <Navbar/>
      Waiting Room
      <div>
        Your passcode is {id}
        <br />
        <button onClick={() => navigate('/map')}>View map</button>
        <br />
        Share this passcode with your participants
        <br />
        <button onClick={() => navigate(`/uploadpicroom/${id}`)}>Upload picture</button>
        <div> 
          <ThreeDView />
        </div>
        <div>
          <ArtBoard id={id}/>
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
