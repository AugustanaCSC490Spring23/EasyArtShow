import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import ThreeDView from "../../components/ThreeDView.js";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import auth from "../../backend/firebase.js";

import Header from "../../components/Header.js";
import QRCodeComponent from "../../components/QRCodeComponent.js";

function WaitingRoomComponent({ id, roomDescription, roomLocation }) {
  const navigate = useNavigate();
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

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [roomIsPrivate, setRoomIsPrivate] = useState(true);
  const [roomVerify, setRoomVerify] = useState(true);
  const [roomParticipants, setRoomParticipants] = useState([]);
  const [userInfo, setUser] = useState(null);

  const db = getDatabase();

  const roomRef = dbRef(db, "easyartshow/rooms/");
  const storage = getStorage();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomData(data);
    });

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      {userInfo === null ? (
        <WaitingRoomComponent
          id={id}
          roomDescription={roomDescription}
          roomLocation={roomLocation}
        />
      ) : (
          <WaitingRoomComponent
          id={id}
          roomDescription={roomDescription}
          roomLocation={roomLocation}
        />
      )}
    </div>
  );
}

export default WaitingRoom;
