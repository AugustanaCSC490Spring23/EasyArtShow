import React, { useState, useEffect } from "react";
import ArtBoard from "../../components/ArtBoard.js";
import { useNavigate, useParams} from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import Navbar from "../../components/Navbar/Navbar";
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import QRCodeComponent from "../../components/QRCodeComponent.js";
import Loading from "../../components/Loading.js";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiShare, FiUpload } from "react-icons/fi";
import { SlInfo } from "react-icons/sl";
import "../../components/Room/WaitingRoom.css";
import CommentBox from "../../components/CommentBox.js";

function WaitingRoomComponent({ id, roomName, roomDescription, roomLocation}) {
  const navigate = useNavigate();
  const [isSlideShow,setIsSlideShow]= useState(true);

  const handleSwitchView = () => {
    setIsSlideShow(!isSlideShow);
  }

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
          <button className="custom-button" onClick={() => navigate(`/slideshow/${id}`)}>
            Slideshow
          </button>
          <SlInfo className="info-button" />
        </div>
      </div>

      <div className="gallery-wrapper">
        <ArtBoard id={id}/>
        <button
            className="system-button-secondary"
            style={{ width: "200px" }}
            onClick={() => navigate(`/uploadpicroom/${id}`)}
          >
            <AiOutlineCloudUpload /> Upload photos
          </button>
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
      console.log(docSnap.data())
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
