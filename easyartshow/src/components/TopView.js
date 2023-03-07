import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const top3 = ["BZWXdT", "CLyofb", "QDdLfW"];

function SingleRoom({ id }) {
    const navigate = useNavigate();
  
    return (
      <div>
        <h3>Code: {id} </h3>
        <button onClick={() => navigate(`/loading/${id}`)}>Join room</button>
      </div>
    );
  }

function TopView() {
  return (
    <div>
      <h1> Top 3 rooms to join: </h1>
      <br />
      {top3.map((id) => (
        <SingleRoom id={id} />
    ))}
    </div>
  );
}



export default TopView;

// function JoinRoom() {
//   const navigate = useNavigate();
//   const [roomCode, setRoomCode] = useState("");
//   const [roomList, setRoomList] = useState([]);
//   const [roomPartcipantName, setRoomParticipantName] = useState("");
//   const db = getDatabase();
//   const roomRef = ref(db, "easyartshow/rooms/");

//   const onChangeParticipantName = (event) => {
//     setRoomParticipantName(event.target.value);
//   };

//   const onChangeHandler = (event) => {
//     setRoomCode(event.target.value);
//   };

//   useEffect(() => {
//     onValue(roomRef, (snapshot) => {
//       const data = snapshot.val();
//       setRoomList(data);
//     });
//   }, []);

//   function joinroom(id) {
//     if (roomCode in roomList) {
//       // Debug
//       navigate(`/waitingroom/${roomCode}`);
//     } else {
//       alert("Room does not exist");
//     }
//   }

//   return (
//     <div>
//       <Header />
//       Name:{" "}
//       <input
//         type="text"
//         onChange={onChangeParticipantName}
//         value={roomPartcipantName}
//       />
//       Room passcode:{" "}
//       <input type="text" onChange={onChangeHandler} value={roomCode} />
//       <button onClick={() => joinroom()}>Join room</button>
//     </div>
//   );
// }

// export default JoinRoom;
