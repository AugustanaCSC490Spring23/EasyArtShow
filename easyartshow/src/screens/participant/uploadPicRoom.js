import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  list,
  getDownloadURL,
} from "@firebase/storage";
import { getDatabase, ref as dbRef, set } from "@firebase/database";
import auth from "../../backend/firebase";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import Navbar from "../../components/Navbar/Navbar";
import { FileUploader } from "react-drag-drop-files";
import {AiOutlineArrowLeft} from "react-icons/ai";

const UploadPicRoom = () => {
  const [picture, setPicture] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const fileTypes = ["PNG", "HEIC", "GIF", "JPEG", "JPG"];

  const handlePictureChange = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setFilename(file.name);
    setFile(file);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        setParticipantName(user.displayName);
      };
    });
  }, []);

  const onChangeParticipantName = (event) => {
    setParticipantName(event.target.value);
  };
  
  const onChangeArtTitle = (event) => {
    setArtTitle(event.target.value);
  };

  const uploadPhoto = () => {
    const filenameRef = new Date().getTime() + "-" + filename;
    const storageRef = ref(
      storage,
      `easyartshow/rooms/${id}/images/${filenameRef}`
    );
    
    if (user) {
      setParticipantName(user.displayName.toString());
    };
    const metadata = {
      customMetadata: {
        'participantName': participantName,
        'artTitle': artTitle
      }
    };
    if (file && artTitle && participantName) {
      uploadBytes(storageRef, file, metadata)
      .then((snapshot) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    } else {
      alert("Please upload your image, enter your name and art's title!");
    }
  };

  return (
    <div>
      <Navbar />
      <AiOutlineArrowLeft onClick={() => navigate(`/waitingroom/${id}`)} />
      <h2> Upload Pic </h2>
      {user ? (
        <NameBox user={user.displayName} />
      ) : (
        <div>
          <h4> Your Name </h4>
          <input type="text" onChangeCapture={onChangeParticipantName} value={participantName}/>
          <br />
        </div>
      )}
      Choose a picture:
      <br />
      <FileUploader handleChange={handlePictureChange} name="Image" types={fileTypes} />
      <br />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Selected"
          style={{ width: "150px", height: "150px" }}
        />
      )}
      <br />
      <h3> Artwork title </h3>
      <textarea type="text" onChangeCapture={onChangeArtTitle} value={artTitle}/>
      <br />
      <button onClick={() => uploadPhoto()}> Submit </button>
      <br />
      <br />
      <button onClick={() => navigate(`/waitingroom/${id}`)}>
        {" "}
        Go to library
        {" "}
      </button>
    </div>
  );
};

function NameBox({ user }) {
  return (
    <div>
      <h4> Welcome, {user} </h4>
      <br />
    </div>
  );
}

export default UploadPicRoom;
