import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getStorage,  
} from "@firebase/storage";
import auth from "../../backend/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import Navbar from "../../components/Navbar/Navbar";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineArrowLeft } from "react-icons/ai";

const UploadPicRoom = () => {
  
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
      }
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
    }
    const metadata = {
      customMetadata: {
        participantName: participantName,
        artTitle: artTitle,
        imageStamp: new Date().getTime(),
      },
    };
    if (file && artTitle && participantName) {
      uploadBytes(storageRef, file, metadata)
        .then(() => {
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
      <div style={{ textAlign: "center" }}>
        <a href={`/waitingroom/${id}`}>
          <AiOutlineArrowLeft/>
           <text> Back to library </text>
        </a>
        <h2> Upload Pic </h2>
        {user ? (
          <NameBox user={user.displayName} />
        ) : (
          <div>
            <h4> Your Name </h4>
            <input
              type="text"
              onChangeCapture={onChangeParticipantName}
              value={participantName}
            />
            <br />
          </div>
        )}
        Choose a picture:
        <br />
        <div style={{textAlign:"-webkit-center"}}> 
        <FileUploader
          handleChange={handlePictureChange}
          name="Image"
          types={fileTypes}
        />
        </div>
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
        <textarea
          type="text"
          placeholder="What do you call your art?"
          onChangeCapture={onChangeArtTitle}
          value={artTitle}
          style={{ width: "70%" }}
        />
        <br />
        {/* <div>
        <h3> Record a voice message </h3>
        <AudioRecorder onRecordingComplete={addAudioElement} />
        <br />
      </div> */}
        <button onClick={() => uploadPhoto()}> Submit </button>
        <br />
        <br />
        <button onClick={() => navigate(`/waitingroom/${id}`)}>
          {" "}
          Go to library{" "}
        </button>
      </div>
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
