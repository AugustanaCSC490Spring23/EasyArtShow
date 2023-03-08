import React, { useEffect, useState } from "react";
import TopView from "../../components/TopView";
import { getDatabase, ref, onValue } from "@firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

function HostHistory({ userUid }) {
  const db = getDatabase();
  const roomRef = ref(db, `easyartshow/hosts/${userUid}/`);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();

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
          <h1> Your rooms: </h1>
          <div>
            {Object.keys(roomData).map((key, index) => {
              return (
                <div key={index}>
                  <br />
                  <h3> Title: {roomData[key].roomName} </h3>
                  <h4> Code: {roomData[key].roomCode} </h4>
                  <button onClick={() => navigate(`/waitingroom/${roomData[key].roomCode}`)}>
                    Join room
                  </button>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default HostHistory;
