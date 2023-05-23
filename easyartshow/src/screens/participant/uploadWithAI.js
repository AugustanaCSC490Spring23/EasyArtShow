import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from "@firebase/storage";
import { auth } from "../../backend/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { doc, updateDoc, arrayUnion, getFirestore } from "@firebase/firestore";
import { GrClose } from "react-icons/gr";
import { NoToneMapping } from "three";
import ClipLoader from "react-spinners/ClipLoader";

const UploadWithAI = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();
  const fireStoreDB = getFirestore();
  const fileTypes = ["PNG", "HEIC", "GIF", "JPEG", "JPG"];

  const [imageUrl, setImageUrl] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const [artPrompt, setArtPrompt] = useState("");
  const [artCaption, setArtCaption] = useState("");
  const [startCreateArt, setStartCreateArt] = useState(false);
  const PROJECT_NAME = "easyartshow";

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
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: artPrompt,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    setArtUrl(image_url);
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
    if (artTitle && artUrl && participantName) {
      setIsUploaded(true);
      updateDoc(doc(fireStoreDB, "rooms", `${id}`), {
        images: arrayUnion({
          fileName: filenameRef,
          participantName: participantName,
          artTitle: artTitle,
          imageStamp: timeStamp,
          timeCreatedFullFormat: convertTime(timeStamp),
          imageUrl: artUrl,
          imageRef: null,
        }),
      });
      console.log("Uploaded successfully");
      navigate(`/waitingroom/${id}`);
    } else {
      alert("Please enter all fields.");
    }
  };

  return (
    <div className="modal-background">
      <div className="modal">
        <GrClose onClick={() => navigate(-1)}> </GrClose>
        <h2 className="headtext__major title"> Create Art with AI</h2>
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

        <div>
          {imageUrl && <h2 className="headtext__minor">{filename} selected</h2>}
          <div className="input-field">
            <h2 className="headtext__info"> Your prompt</h2>
            <input
              type="text"
              onChangeCapture={onChangeArtPrompt}
              value={artPrompt}
              style={{ width: "70%" }}
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
          />    )
        }

        {artUrl && (
          <div>
            {" "}
            <img src={artUrl} alt="" style={{ width: "50%" }} />
            <br />
            <input
              type="text"
              onChangeCapture={onChangeArtTitle}
              value={artTitle}
              placeholder="Please give this art a title"
            />
            <button
              className="system-button-primary"
              onClick={() => uploadPhoto()}
            >
              {" "}
              Upload this art{" "}
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
