import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import Login from "./authentication/login";
import WaitingRoom from "./waitingroom";

import { getDatabase, ref, set } from "@firebase/database";

const HostRoom = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [goToWaitingRoom, setGoToWaitingRoom] = useState(false);
  const [goToJoinRoom, setGoToJoinRoom] = useState(false);

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const randomCodeGenerator = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  function createRoom() {
    const randomCode = randomCodeGenerator();

    const db = getDatabase();
    set(ref(db, "easyartshow/rooms/" + randomCode), {
      hostid: user.uid,
      hostname: user.displayName,
    });
    setGoToWaitingRoom(true);
  };

  useEffect(() => {
    if (goToWaitingRoom) {
      navigate("/waitingroom");
    } else if (goToJoinRoom) {
      navigate("/joinroom");
    }
  }, [goToWaitingRoom, goToJoinRoom]); // This will only listen to changes on value

  return (
    <div>
      Welcome, {user.displayName}
      <br />
      Your user ID is {user.uid}
      <br />
      <button onClick={() => createRoom()}> Create room </button>
      <br />
      <button onClick={() => setGoToJoinRoom(true)}> Join room </button>
      <br />
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default HostRoom;
