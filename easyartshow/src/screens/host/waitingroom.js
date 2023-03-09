import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import ThreeDView from "../../components/ThreeDView.js";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import auth from "../../backend/firebase.js";

import Navbar from "../../components/Navbar/Navbar";
import QRCodeComponent from "../../components/QRCodeComponent.js";
import Loading from "../../components/Loading.js";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";

function WaitingRoomComponent({ id, roomName, roomDescription, roomLocation }) {
  const navigate = useNavigate();
  return (
    <div style={{textAlign: "center"}}>
      <Navbar />
      <a href={`/hostroom`}>
          <AiOutlineArrowLeft />
          <text> Back to dashboard </text>
          </a>
      <div style={{textAlign: "center"}}> 
      <h1> {roomName} </h1>
      {roomDescription &&<> <text><br/> <b> Description: </b> {roomDescription}</text><br/></>}
      <br/>
      {/* <button onClick={() => navigate("/map")}>View map</button> */}
      <div>
        Your passcode is <h2>{id}</h2>
        <br />
        Share this code with your participants. 
        <button onClick={() => navigate(`/qrcode/${id}`)}>
          View QR Code for your room{" "}
        </button>
        <br />
        <br />
        
        <button onClick={() => navigate(`/uploadpicroom/${id}`)}>
          <AiOutlineCloudUpload/>
          Upload picture
        </button>
        {/* <div>
          <ThreeDView />
        </div> */}
        <div>
          <ArtBoard id={id} />
        </div>
      </div>
      </div>
    </div>
  );
}

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const db = getDatabase();

  const roomRef = dbRef(db, "easyartshow/rooms/");
  let [color, setColor] = useState("#ffffff");

  const { id } = useParams();

  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomData(data);
      setRoomName(data[id].roomInfo.roomName);
      setRoomDescription(data[id].roomInfo.roomDescription);
      setRoomLocation(data[id].roomInfo.roomlocation);
    });
  }, []);

  return (
    <div>
      {roomData === null ? (
        <Loading loadingState={true} />
      ) : (
        <div> 
          {/* <h1> {roomData[id].roomInfo.roomName}</h1> */}
        <WaitingRoomComponent
          id={id}
          roomName={roomName}
          roomDescription={roomDescription}
          roomLocation={roomLocation}
        />
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
