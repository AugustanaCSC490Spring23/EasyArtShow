import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "@firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
} from "@firebase/storage";
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc, 
  deleteField
} from "@firebase/firestore";
import '../../components/Dashboard/HostHistory.css';
import '../../components/Room/Modal.css';
import placeholder from "../../asset/img-3.jpg";
import Carousel from "react-elastic-carousel";

const DeletePrompt = ({ onDelete, onCancel, roomCode, roomTitle}) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <p className="headtext__major title">Are you sure you want to delete this room?</p> <h1 className="headtext__major">{roomTitle}</h1>
        <div className="button-group-row">
          <button className="system-button system-button-primary" onClick={onDelete}>Yes</button>
          <button className="system-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

function HostHistory({ userUid }) {
  const firestoreDB = getFirestore();
  const roomRef = doc(firestoreDB, `hosts/${userUid}/`);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectRoomCode, setSelectRoomCode] = useState("");
  const [selectRoomTitle, setSelectRoomTitle] = useState("");


  const deletePhoto = (roomCode) => {
    deleteDoc(doc(firestoreDB, "rooms", `${roomCode}`));
    updateDoc(doc(firestoreDB, "hosts", `${userUid}`), {
      [roomCode]: deleteField()
    }).then(() => {
      console.log("Document successfully deleted!");
      window.location.reload();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  const onToggleDelete = (roomCode, roomTitle) => {
    setShowDeletePrompt(true);
    setSelectRoomCode(roomCode);
    setSelectRoomTitle(roomTitle);
  };

  const handleDelete = () => {
    // delete the file
    deletePhoto(selectRoomCode);
    setShowDeletePrompt(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
  };

  useEffect(() => {
    const getRoomData = async () => {
      const roomData = await getDoc(roomRef);
      if (roomData.exists()) {
        setRoomData(roomData.data());
      } else {
        console.log("No such document!");
      }
    };
    getRoomData();
  }, []);


  return (
    <div id='host-history-section'>
      {roomData && (
        <div>
          {showDeletePrompt && (
            <DeletePrompt
              roomCode={selectRoomCode}
              roomTitle={selectRoomTitle}
              onDelete={handleDelete}
              onCancel={handleCancelDelete}
            />
          )}

          <Carousel itemsToShow={3} className='host-history-wrapper wrapper'>
            {Object.keys(roomData).map((key, index) => {
                return (
                  <div key={index} className='room-card'>
                    <h3 className="headtext__major"> {roomData[key].roomName} </h3>
                    <h4 className="headtext__minor"> Code: {roomData[key].roomCode} </h4>
                    <img src={placeholder} />
                    <div className="button-group-row">
                      <button className="system-button system-button-primary"
                        onClick={() =>
                          navigate(`/waitingroom/${roomData[key].roomCode}`)
                        }
                      >
                        Join room
                      </button>
                      <button className="system-button"
                        onClick={() => onToggleDelete(roomData[key].roomCode, roomData[key].roomName)}
                      >
                        {" "}
                        Delete room
                        {" "}
                      </button>
                    </div>
                    <br />
                  </div>
                );
              })}
          </Carousel>
        </div>
      )}
      {/* <text> Maximum 3 rooms allowed. <a href="#">Subscribe</a> to add more. </text> */}
    </div>
  );
}

export default HostHistory;
