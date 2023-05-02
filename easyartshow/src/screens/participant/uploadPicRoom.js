import React, { useState, useEffect, useRef } from "react";
import styles from "./Background.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getStorage,  
} from "@firebase/storage";
import { getDatabase, ref as dbRef, set } from "@firebase/database";
import { auth } from "../../backend/firebase";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { getDownloadURL } from "@firebase/storage";
import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  getFirestore,
} from "@firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineArrowLeft } from "react-icons/ai";
import background from "../../asset/background/caption_background_1.jpeg";

const UploadPicRoom = () => {
  
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const fileTypes = ["PNG", "HEIC", "GIF", "JPEG", "JPG"];
  const fireStoreDB = getFirestore();
  const [artCaption, setArtCaption] = useState("");

  const onChangeArtCaption = (event) => {
    setArtCaption(event.target.value);
  };

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
    const filenameRef = new Date().getTime() + "-" + filename;
    const storageRef = ref(
      storage,
      `easyartshow/rooms/${id}/images/${filenameRef}`
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
                imageRef: snapshot.ref.fullPath.replace("easyartshow/", ""),
              }),
            });
          });
          // window.location.reload();
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
          <AiOutlineArrowLeft />
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
        {isUploaded && (
          <h2>
            {" "}
            Photo uploaded. Upload another picture or go back to library.{" "}
          </h2>
        )}

        <div>
          Choose a picture:
          <br />
          <div style={{ textAlign: "-webkit-center" }}>
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
        </div>

        <div>
          <br />
          ------ or ------
          <br />
          <h2> Create art from caption </h2>
          <br />
          <textarea
            type="text"
            placeholder="Enter your caption here"
            style={{ width: "70%" }}
            value={artCaption}
            onChangeCapture={onChangeArtCaption}
          />
          <br />
          <article
            className={styles.article}
            style={{ backgroundImage: `url(${background})` }}
          >
            <h1 className={styles.header}>{artCaption}</h1>
          </article>
        </div>

        <br />
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
