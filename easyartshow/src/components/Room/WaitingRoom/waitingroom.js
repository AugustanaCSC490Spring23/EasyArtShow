import React, { useState, useEffect, Component } from "react";

import ArtBoard from "../ArtBoard/ArtBoard.js";
import Navbar from "../../Navbar/Navbar.js";
import QRCodeComponent from "../../QRCodeComponent.js";
import Loading from "../../Loading.js";

import { useNavigate, useParams } from "react-router-dom";
import { doc, getFirestore, getDoc } from "@firebase/firestore";

// Icons
import { AiOutlineArrowLeft, AiOutlineCloudUpload } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { SlInfo } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import CommentBox from "../../CommentBox.js";

// Images
import images from "../../../constants/images.js";

// CSS
import "./WaitingRoom.css";
import "../../Room/Modal.css";

const SlideshowSettingModal = ({ show, handleClose, id }) => {
  /**
   * Modal for setting slideshow options
   * @param {boolean} show
   * @param {function} handleClose
   * @param {string} id
   */
  const navigate = useNavigate();
  const [includeBackground, setIncludeBackground] = useState(true);
  const [includeTitle, setIncludeTitle] = useState(true);
  const [includeDescription, setIncludeDescription] = useState(true);
  const [includeContributor, setIncludeContributor] = useState(true);
  const [infiniteLooping, setInfiniteLooping] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [slideDuration, setSlideDuration] = useState(3000);

  const [buttonStates, setButtonStates] = useState(Array(6).fill(true));
  const modalClassname = show ? "modal-background" : "display-none";

  // Shoutout to ChatGPT for this graceful solution
  const handleButtonClick = (index) => {
    /**
     * Handles button clicks for slideshow settings modal
     * @param {number} index
     * @returns {void}
     */
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);

    const buttonOnClick = buttonOnClicks[index];
    buttonOnClick(newButtonStates[index]);
  };

  const buttonOnClicks = [
    () => setIncludeBackground(!includeBackground),
    () => setIncludeTitle(!includeTitle),
    () => setIncludeDescription(!includeDescription),
    () => setIncludeContributor(!includeContributor),
    () => setInfiniteLooping(!infiniteLooping),
    () => setAutoPlay(!autoPlay),
  ];

  const handleSlideDuration = (event) => {
    /**
     * Handles slide duration input
     * @param {event} event
     * @returns {void}
     * */

    setSlideDuration(event.target.value);
  };

  const buttonLabels = [
    "Include background",
    "Include art title",
    "Include description",
    "Include contributor",
    "Infinite looping",
    "Autoplay",
  ];

  const slideShowStates = {
    includeBackground: includeBackground,
    includeTitle: includeTitle,
    includeDescription: includeDescription,
    includeContributor: includeContributor,
    infiniteLooping: infiniteLooping,
    slideDuration: slideDuration,
    autoPlay: autoPlay,
  };

  const handleStartSlideshow = () => {
    /**
     * Handles start slideshow button
     * @returns {void}
     * */

    navigate(`/slideshow/${id}`, { state: { slideShowStates } });
  };

  return (
    <div className={modalClassname}>
      <div className="modal">
        <div className="modal-header">
          <img
            src={images.setting_icon}
            alt="setting-illustration"
            className="setting-icon"
          />
          <GrClose onClick={handleClose} className="close-button" />
        </div>
        <div>
          <h2 className="headtext__major">Settings</h2>
        </div>

        <div className="modal-content">
          {buttonStates.map((isActive, index) => (
            <button
              key={index}
              className={isActive ? "active" : "inactive"}
              onClick={() => handleButtonClick(index)}
            >
              <label className="headtext_info">{buttonLabels[index]}</label>
              <FontAwesomeIcon
                className={isActive ? "active" : "display-none"}
                icon={faCheck}
                size="lg"
              />
            </button>
          ))}
          <button className="duration-div">
            <label className="headtext_info">Duration (second/slide):</label>
            <input
              className="duration-input"
              type="number"
              onChange={handleSlideDuration}
              value={slideDuration}
            />
          </button>
        </div>

        <div className="button-group-row">
          <button className="system-button-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="custom-button" onClick={handleStartSlideshow}>
            {" "}
            Start{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

function WaitingRoomComponent({
  id,
  roomName,
  roomDescription,
  roomLocation,
  commentBoxMode,
}) {
  /**
   * Waiting room component
   * @param {string} id
   * @param {string} roomName
   * @param {string} roomDescription
   * @param {string} roomLocation
   * @returns {JSX.Element}
   * */
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
          <button className="custom-button" onClick={handleShow}>
            Slideshow
          </button>
          <SlideshowSettingModal
            show={show}
            handleClose={handleClose}
            id={id}
          />
          <SlInfo className="info-button" />
        </div>
      </div>

      <div className="gallery-wrapper">
        <ArtBoard id={id} />
        <button
          className="system-button-secondary"
          style={{ width: "200px" }}
          onClick={() => navigate(`/uploadpicroom/${id}`)}
        >
          <AiOutlineCloudUpload /> Upload photos
        </button>
      </div>
      {commentBoxMode && (
        <div className="comment-wrapper">
          <CommentBox id={id} />
        </div>
      )}
    </div>
  );
}

function WaitingRoom() {
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [isCommentBox, setIsCommentBox] = useState(false);

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
        setIsCommentBox(docSnap.data().roomInfo.commentBox);
      } else {
        console.log("No such document!");
      }
    };
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
            commentBoxMode={!isCommentBox}
          />
        </div>
      )}
    </div>
  );
}

export default WaitingRoom;
export { SlideshowSettingModal };
