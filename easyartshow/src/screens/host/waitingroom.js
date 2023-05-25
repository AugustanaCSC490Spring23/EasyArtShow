import React, { useState, useEffect } from "react";
import ArtBoard from "../../components/ArtBoard.js";
import { useNavigate, useParams} from "react-router-dom";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";

import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading.js";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { SlInfo }  from "react-icons/sl";
import "../../components/Room/WaitingRoom.css";

function WaitingRoomComponent({ id, roomName, roomDescription, roomLocation, creater }) {
  
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  // const handleMouseOver = () => {
  //   setShowInfo(true);
  // };
  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementsById('info-button');
      const buttonDistance = button.getBoundingClientRect().top;
      const cursorDistance = Math.hypot(
        button.getBoundingClientRect().left - window.event.clientX,
        button.getBoundingClientRect().top - window.event.clientY
      );
      if (buttonDistance < window.innerHeight / 2 && cursorDistance < 100) {
        setShowInfo(true);
      } else {
        setShowInfo(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleMouseMove = (event) => {
    const button = document.getElementById('info-button');
    const buttonDistance = button.getBoundingClientRect().top;
    const cursorDistance = Math.hypot(
      button.getBoundingClientRect().left - event.clientX,
      button.getBoundingClientRect().top - event.clientY
    );
    if (buttonDistance < window.innerHeight / 2 && cursorDistance < 100) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  };

  const handleButtonClick = () => {
    setShowInfo(!showInfo);
  };
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
          <a className="headtext__minor" href={`/qrcode/${id}`}> <FiShare/> Share this room</a>
        </div>
        <div className="right-button-group">
          <button className="system-button system-button-primary">Slideshow</button>
          <SlInfo id="info-button" onClick={handleButtonClick} onMouseMove={handleMouseMove}/>
          {/* <button onClick={toggleInfo}>Info</button> */}
          {showInfo && <div> 
            roomName={ roomName}
            <br/>
            roomDescription={ roomDescription}
            <br/>
            created by={ creater} </div>}
        </div>
      </div>
      
      <div className="gallery-wrapper"> 
        <ArtBoard id={id} />
        <button className="system-button" style={{maxWidth: "200px"}} onClick={() => navigate(`/uploadpicroom/${id}`)}>
            <AiOutlineCloudUpload/> Upload picture
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
  const [creater, setCreater] = useState(false); 
  const db = getDatabase();

  const roomRef = dbRef(db, "easyartshow/rooms/");

  const { id } = useParams();

  useEffect(() => {
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomData(data);
      setRoomName(data[id].roomInfo.roomName);
      setRoomDescription(data[id].roomInfo.roomDescription);
      setRoomLocation(data[id].roomInfo.roomlocation);
      setCreater(data[id].hostname);
      
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {roomData === null ? (
        <Loading loadingState={true} />
      ) : (
        <div> 
          {/* <h1> {roomData[id].roomInfo.roomName}</h1> */}
          <Navbar/>
          <WaitingRoomComponent
            id={id}
            roomName={roomName}
            roomDescription={roomDescription}
            roomLocation={roomLocation}
            creater={creater}
          />
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
