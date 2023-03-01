import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import ThreeDView from "../../components/ThreeDView.js";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";

import Header from "../../components/Header.js";
import QRCodeComponent from "../../components/QRCodeComponent.js";

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [roomIsPrivate, setRoomIsPrivate] = useState(true);
  const [roomVerify, setRoomVerify] = useState(true);
  const [roomParticipants, setRoomParticipants] = useState([]);

  const db = getDatabase();

  const roomRef = dbRef(db, "easyartshow/rooms/");
  const storage = getStorage();
  const navigate = useNavigate();

  const { id } = useParams();
  

  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data =  snapshot.val();
      setRoomData(data);
    });
    
    // if (roomData !== null) {
    //   if ((isInitialRender) === true) {
    //     setRoomName(roomData[id].roomInfo.roomName.toString());
    //     setRoomDescription(roomData[id].roomInfo.roomDescription.toString());
    //     setRoomLocation(roomData[id].roomInfo.roomLocation.toString());
    //     setRoomIsPrivate(roomData[id].roomInfo.roomIsPrivate.toString());
    //     setRoomVerify(roomData[id].roomInfo.roomVerify.toString());
    //     setIsInitialRender(false);
    //   }
    // } else {
    //   console.log("roomData is null");
    // }

  }, []);

  return (
    <div>
      <Header />
      <h1> Wating room </h1>
      <br />
      <h2> {roomDescription}</h2>
      <br />
      <h3> {roomLocation}</h3>
      <button onClick={() => navigate("/map")}>View map</button>
      <div>
        Your passcode is {id}
        <br />
        Share this code with your participants.
        <button onClick={() => navigate(`/qrcode/${id}`)}>
          {" "}
          View QR Code{" "}
        </button>
        {/* <QRCodeComponent/> */}
        <br />
        <button onClick={() => navigate(`/uploadpicroom/${id}`)}>
          Upload picture
        </button>
        <div>
          <ThreeDView />
        </div>
        <div>
          <ArtBoard id={id} />
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
