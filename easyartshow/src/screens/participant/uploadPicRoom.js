import React, { useState, useEffect, useRef } from "react";
import styles from "./Background.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, getStorage } from "@firebase/storage";
import { auth } from "../../backend/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { doc,updateDoc, arrayUnion, getFirestore } from "@firebase/firestore";
import { FileUploader } from "react-drag-drop-files";
import { GrClose } from "react-icons/gr";

import background from "../../asset/background/caption_background_1.jpeg";

const UploadPicRoom = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();
  const fireStoreDB = getFirestore();
  const fileTypes = ["PNG", "HEIC", "GIF", "JPEG", "JPG"];

  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const [artCaption, setArtCaption] = useState("");
  const PROJECT_NAME = "easyartshow"

  const onChangeArtCaption = (event) => {
    setArtCaption(event.target.value);
  };

  const handlePictureChange = (file) => {
    /**
     * Convert image to base64
     * @param {File} file
     * @returns {Promise<string>} base64 string
     */
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

  const convertTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${day}-${month}-${year} at ${hour}:${minute}`;
  };

  const uploadPhoto = () => {
    /**
     * Upload image to firebase storage
     */
    const filenameRef = new Date().getTime() + "-" + filename;
    const storageRef = ref(
      storage,
      `${PROJECT_NAME}/rooms/${id}/images/${filenameRef}`
    );

    if (user) {
      setParticipantName(user.displayName.toString());
    }

    const timeStamp = new Date().getTime();
    const metadata = {
      customMetadata: {
        participantName: participantName,
        artTitle: artTitle,
        imageStamp: timeStamp,
        timeCreatedFullFormat: convertTime(timeStamp),
      },
    };
    if (file && artTitle && participantName) {
      uploadBytes(storageRef, file, metadata)
        .then((snapshot) => {
          setIsUploaded(true);
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            updateDoc(doc(fireStoreDB, "rooms", `${id}`), {
              images: arrayUnion({
                fileName: filenameRef,
                participantName: participantName,
                artTitle: artTitle,
                imageStamp: timeStamp,
                timeCreatedFullFormat: convertTime(timeStamp),
                imageUrl: downloadURL,
                imageRef: snapshot.ref.fullPath.replace(`${PROJECT_NAME}/`, ""),
              }),
            });
          });
          console.log("Uploaded successfully");
          navigate(`/waitingroom/${id}`)
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      alert("Please upload your image, enter your name and art's title!");
    }
  };

  return (
    <div className="modal-background">
      <div className="modal">
      <GrClose onClick={() => navigate(`/waitingroom/${id}`)}> </GrClose>
        <h2 className="headtext__major title"> Upload picture</h2>
        {user ? (
          <NameBox user={user.displayName} />
        ) : (
          <div className="input-field">
            <h4> Your Name </h4>
            <input
              type="text"
              onChangeCapture={onChangeParticipantName}
              value={participantName}
            />
            <br />
          </div>
        )}
        {isUploaded && (
          <h2>
            {" "}
            Photo uploaded. Upload another picture or go back to library.{" "}
          </h2>
        )}

        <div className="first-section">
          <div className="input-field">
            <h2 className="headtext__info" >Choose a picture</h2>
            <FileUploader
              handleChange={handlePictureChange}
              name="Image"
              types={fileTypes}
            />
          </div>
          {imageUrl && (
            <h2 className="headtext__minor">{filename} selected</h2>
          )}
          <div className="input-field">
            <h2 className="headtext__info"> Artwork title </h2>
            <input
              type="text"
              onChangeCapture={onChangeArtTitle}
              value={artTitle}
              style={{ width: "70%" }}
            />
          </div>
        </div>
        <button className="system-button-primary" onClick={() => uploadPhoto()}> Upload this image </button>
        <br />
        <button className="system-button-secondary" onClick={() => navigate(`/uploadwithai/${id}`)}> 
            Create art with AI
        </button>
        {/* <button className="system-button-secondary" onClick={() => navigate(`/waitingroom/${id}`)}>
          {" "}
          Go to library{" "}
        </button> */}
      </div>
    </div>
  );
};

function NameBox({ user }) {
  return (
    <div>
      <h4 className="headtext__info"> Welcome, {user} </h4>
    </div>
  );
}


export default UploadPicRoom;
