import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { doc, getFirestore, updateDoc, getDoc, deleteDoc,  deleteField } from "@firebase/firestore";
import placeholder from "../../../asset/img-3.jpg";
import Carousel from "react-elastic-carousel";

// CSS
import './HostHistory.css';
import '../../Room/Modal.css';

const DeletePrompt = ({ onDelete, onCancel, roomCode, roomTitle}) => {
  /**
   *  @description - This function returns a JSX element of the delete prompt
   *               that is shown when the user clicks on the delete button.
   *              The delete prompt is a modal that is shown on top of the
   *             host history page.
   *       
   * @param {function} onDelete - function to call when user confirms deletion
   * @param {function} onCancel - function to call when user cancels deletion
   * @param {string} roomCode - room code of the room to be deleted
   * @param {string} roomTitle - room title of the room to be deleted
   * 
   * @returns {JSX.Element} - JSX element of the delete prompt
   * 
  */
  return (
    <div className="modal-background">
      <div className="modal">
        <p className="headtext__major title">Are you sure you want to delete this room?</p> <h1 className="headtext__major">{roomTitle}</h1>
        <div className="button-group-row">
          <button className="system-button-secondary" onClick={onCancel}>No</button>
          <button className="system-button-primary" onClick={onDelete}>Yes</button>
        </div>
      </div>
    </div>
  );
};

function HostHistory({ userUid }) {
  const firestoreDB = getFirestore();
  const roomRef = doc(firestoreDB, `hosts/${userUid}/`);

  const [roomData, setRoomData] = useState([]);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectRoomCode, setSelectRoomCode] = useState("");
  const [selectRoomTitle, setSelectRoomTitle] = useState("");

  const navigate = useNavigate();

  const deleteRoom = (roomCode) => {
    /**
     * @description - This function deletes the room from the database
     * 
     * @param {string} roomCode - room code of the room to be deleted
     * 
     * @returns {void}
     * 
     */
    deleteDoc(doc(firestoreDB, "rooms", `${roomCode}`));
    deleteDoc(doc(firestoreDB, "public", `${roomCode}`));
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
    /**
     * @description - This function toggles the delete prompt
     * 
     * @param {string} roomCode - room code of the room to be deleted
     * @param {string} roomTitle - room title of the room to be deleted
     * 
     * @returns {void}
     * 
     * */
    setShowDeletePrompt(true);
    setSelectRoomCode(roomCode);
    setSelectRoomTitle(roomTitle);
  };

  const handleDelete = () => {
    /**
     * @description - This function handles the deletion of the room
     * 
     * @returns {void}
     *  
     * */
    deleteRoom(selectRoomCode);
    setShowDeletePrompt(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
  };

  useEffect(() => {
    /**
     * @description - This function gets the room data from the database
     * 
     * @returns {void}
     * 
     * */
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
      {roomData ? (
        <div>
          {showDeletePrompt && (
            <DeletePrompt
              roomCode={selectRoomCode}
              roomTitle={selectRoomTitle}
              onDelete={handleDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <Carousel itemsToShow={3} pagination={false} className='host-history-wrapper wrapper'>
            {Object.keys(roomData).map((key, index) => {
                return (
                  <div key={index} className='room-card'>
                    <h3 className="headtext__major"> {roomData[key].roomName} </h3>
                    <h4 className="headtext__minor"> Code: {roomData[key].roomCode} </h4>
                    <div className="button-group-row">
                      <button className="system-button-secondary"
                        onClick={() => onToggleDelete(roomData[key].roomCode, roomData[key].roomName)}
                      > Delete </button>
                      <button className="custom-button"
                        onClick={() =>
                          navigate(`/waitingroom/${roomData[key].roomCode}`)
                        }
                      >
                        Join room
                      </button>
                      
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </div>
      ) : 
      <h1>You don't have any room yet.</h1>
      }
    </div>
  );
}

export default HostHistory;
