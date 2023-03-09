import React, { useEffect, useState } from "react";
import TopView from "../../components/TopView";
import { getDatabase, ref, onValue, set } from "@firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref as storageRef,
  listAll,
  deleteObject,
} from "@firebase/storage";

const DeletePrompt = ({ onDelete, onCancel, roomCode, roomTitle}) => {
  return (
    <div className="delete-prompt">
      <p>Are you sure you want to delete this room {roomCode} - Title: {roomTitle}?</p>
      <button onClick={onDelete}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

function HostHistory({ userUid }) {
  const db = getDatabase();
  const storage = getStorage();
  const roomRef = ref(db, `easyartshow/hosts/${userUid}/`);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [selectRoomCode, setSelectRoomCode] = useState("");
  const [selectRoomTitle, setSelectRoomTitle] = useState("");

  const deletePhoto = (roomCode) => {
    const imgRef = storageRef(storage, "easyartshow/rooms/" + roomCode);
    set(ref(db, "easyartshow/rooms/" + roomCode), null);
    set(ref(db, `easyartshow/hosts/${userUid}/${roomCode}`), null);
    deleteObject(imgRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
    window.location.reload();
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
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoomData(data);
    });
  }, []);

  return (
    <div>
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
          <h1> Your rooms: </h1>
          <div>
            {Object.keys(roomData).map((key, index) => {
              return (
                <div key={index}>
                  <br />
                  <h3> Title: {roomData[key].roomName} </h3>
                  <h4> Code: {roomData[key].roomCode} </h4>
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/waitingroom/${roomData[key].roomCode}`)
                      }
                    >
                      Join room
                    </button>
                    <button
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
          </div>
        </div>
      )}
      <text> Maximum 3 rooms allowed. <a href="#">Subscribe</a> to add more. </text>
    </div>
  );
}

export default HostHistory;
