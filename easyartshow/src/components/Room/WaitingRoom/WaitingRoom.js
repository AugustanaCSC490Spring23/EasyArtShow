import React, { useState, useEffect } from "react";
import ArtBoard from "../ArtBoard/ArtBoard.js";
import { useNavigate, useParams} from "react-router-dom";
import { doc, getFirestore, getDoc } from "@firebase/firestore";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { SlInfo } from "react-icons/sl";

import Navbar from "../../Navbar/Navbar.js";
import Loading from "../../Loading.js";

import "./WaitingRoom.css";

function WaitingRoomComponent({ id, roomName, roomDescription, roomLocation }) {
  const navigate = useNavigate();
  return (
    <div className="waitingroom-wrapper">
      <div className="header-wrapper">
        <a className="headtext__minor" href={`/hostroom`}>
          <AiOutlineArrowLeft /> Dashboard
        </a>
      </div>

      <div className="info-wrapper">
        <h1 className="title"> {roomName} </h1>
        {roomDescription && <h2 className="description">{roomDescription}</h2>}
      </div>

      <div className="system-bar">
        <div className="left-button-group">
          <a className="headtext__minor" href={`/qrcode/${id}`}>
            {" "}
            <FiShare /> Share this room
          </a>
        </div>
        <div className="right-button-group">
          <button
            className="system-button"
            style={{ maxWidth: "200px" }}
            onClick={() => navigate(`/uploadpicroom/${id}`)}
          >
            <AiOutlineCloudUpload /> Upload picture
          </button>
          <button className="system-button system-button-primary">
            Slideshow
          </button>
          <SlInfo className="info-button" />
        </div>
      </div>

      <div className="gallery-wrapper">
        <ArtBoard id={id} />
      </div>
    </div>
  );
}

function WaitingRoom() {
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");

  const db = getFirestore();
  const { id } = useParams();
  const roomRef = doc(db, "rooms", `${id}`);

  useEffect(() => {
    const getRoomData = async () => {
      const docSnap = await getDoc(roomRef);
      if (docSnap.exists()) {
        setRoomData(docSnap.data());
        setRoomName(docSnap.data().roomInfo.roomName);
        setRoomDescription(docSnap.data().roomInfo.roomDescription);
        setRoomLocation(docSnap.data().roomInfo.roomLocation);
      } else {
        console.log("No such document!");
      }
    }
    getRoomData();
  }, []);

  return (
    <div>
      {roomData === null ? (
        <Loading loadingState={true} />
      ) : (
        <div>
          {/* <h1> {roomData[id].roomInfo.roomName}</h1> */}
          <Navbar />
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
