import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  uploadString,
} from "@firebase/storage";
import './uploadWithAI.css';
import { auth } from "../../backend/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, updateDoc, arrayUnion, getFirestore } from "@firebase/firestore";
import { GrClose } from "react-icons/gr";
import { NoToneMapping } from "three";
import ClipLoader from "react-spinners/ClipLoader";
import Dictaphone from "./Dictaphone";
import { transcriptValue } from "./Dictaphone";

const UploadWithAI = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();
  const fireStoreDB = getFirestore();
  const fileTypes = ["PNG", "HEIC", "GIF", "JPEG", "JPG"];
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const [artPrompt, setArtPrompt] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [artCaption, setArtCaption] = useState("");
  const [startCreateArt, setStartCreateArt] = useState(false);
  const PROJECT_NAME = "easyartshow";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        setParticipantName(user.displayName);
      }
    });

    if (transcriptValue !== "") {
      setArtPrompt(transcriptValue);
    }
  }, []);

  const onChangeParticipantName = (event) => {
    setParticipantName(event.target.value);
  };

  const onChangeArtTitle = (event) => {
    setArtTitle(event.target.value);
  };

  const onChangeArtPrompt = (event) => {
    setArtPrompt(event.target.value);
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

  const createArt = async (artPrompt) => {
    /**
     * Create art with AI
     *
     * @param {string} artPrompt
     *
     * @returns {void}
     */
    setStartCreateArt(true);
    const response = await openai.createImage({
      prompt: artPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image_url = response.data.data[0]["b64_json"];
    setArtUrl(image_url);
  };

  const uploadPhoto = async () => {
    /**
     * Upload image to firebase storage
     */
    const filenameRef = new Date().getTime() + "-" + filename;

    if (user) {
      setParticipantName(user.displayName.toString());
    }

    const timeStamp = new Date().getTime();
    const storageRef = ref(
      storage,
      `${PROJECT_NAME}/rooms/${id}/images/${filenameRef}`
    );

    if (artTitle && artUrl && participantName) {
      await uploadString(storageRef, artUrl, "base64").then((snapshot) => {
        setIsUploaded(true);
        getDownloadURL(snapshot.ref).then((url) => {
          updateDoc(doc(fireStoreDB, "rooms", `${id}`), {
            images: arrayUnion({
              fileName: filenameRef,
              participantName: participantName,
              artTitle: artTitle,
              imageStamp: timeStamp,
              timeCreatedFullFormat: convertTime(timeStamp),
              imageUrl: url,
              imageRef: snapshot.ref.fullPath.replace(`${PROJECT_NAME}/`, ""),
            }),
          });
        });
      });
    } else {
      alert("Please enter your art's title and prompt.");
    }
  };

  const uploadProcess = async () => {
    /**
     * Upload image to firebase storage
     * @returns {void}
     */
    uploadPhoto();
    console.log("Photo uploaded");
    navigate(`/waitingroom/${id}`);
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <GrClose onClick={() => navigate(`/waitingroom/${id}`)}> </GrClose>
        <h2 className="headtext__major title"> Create Art with AI</h2>
        {user ? (
          <NameBox user={user.displayName} />
        ) : (
          <div className="input-field">
            <h4> Your Name </h4>
            <input
              type="text"
              onChange={onChangeParticipantName}
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
          {imageUrl && <h2 className="headtext__minor">{filename} selected</h2>}
          <div className="input-field">
            <h2 className="headtext__info"> Your prompt</h2>
            <textarea
              type="text"
              onChange={onChangeArtPrompt}
              value={artPrompt}
              style={{ width: "100%" }}
              placeholder="Example: A cat driving a rocket"
            />
          </div>
        </div>
        <br />
        <button
          className="system-button-primary"
          onClick={() => createArt(artPrompt)}
        >
          {" "}
          Generate Art{" "}
        </button>
        <br />

        {startCreateArt && !artUrl && (
          <ClipLoader
            // cssOverride={override}
            size={150}
            color={"#123abc"}
            loading={true}
            speedMultiplier={1.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}

        {artUrl && (
          <div class="art-container">
            {" "}
            <img
              src={`data:image/jpeg;base64,${artUrl}`}
              alt=""
              class="art-image"
            />
            <br />
            <input
              type="text"
              class="art-title-input"
              onChange={onChangeArtTitle}
              value={artTitle}
              placeholder="Please give this art a title"
            />
            <br />
            <button
              className="system-button-primary"
              onClick={() => uploadProcess()}
            >
              {" "}
              Upload this art
              {" "}
            </button>
          </div>
        )}
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

export default UploadWithAI;
