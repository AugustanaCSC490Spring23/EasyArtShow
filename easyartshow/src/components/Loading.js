import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function Loading({ loadingState }) {
  const [imageUrl, setImageUrl] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [roomIsPrivate, setRoomIsPrivate] = useState(true);
  const [roomVerify, setRoomVerify] = useState(true);
  const [roomParticipants, setRoomParticipants] = useState([]);
  const [stateDone, setStateDone] = useState(false);
  const [userInfo, setUser] = useState(null);
  const [userIDMatch, setUserIDMatch] = useState(false);

  const db = getDatabase();
  const roomRef = dbRef(db, "easyartshow/rooms/");
  const navigate = useNavigate();
  const { id } = useParams();

//   useEffect(() => {
//     onValue(roomRef, (snapshot) => {
//       const data = snapshot.val();
//       setRoomData(data);
//     });

//   }, []);

// //   console.log(roomData);

// if (roomData !== null) {
//     console.log(id);
//     navigate(`waitingroom/${id}`);
// }

  return (
    <div>
      <ClipLoader
        // cssOverride={override}
        size={150}
        color={"#123abc"}
        loading={loadingState}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1> Loading.... </h1>
    </div>
  );
}

export default Loading;
