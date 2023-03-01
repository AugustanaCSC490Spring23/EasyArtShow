import React, { useState, useEffect } from "react";
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
import Header from "../../components/Header";

const UploadPicRoom = () => {
  const [picture, setPicture] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const storage = getStorage();
  const { id } = useParams();

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setFilename(file.name);
    setFile(file);
  };

  const uploadPhoto = () => {
    const filenameRef = new Date().getTime() + "-" + filename;
    const storageRef = ref(
      storage,
      `easyartshow/rooms/${id}/images/${filenameRef}`
    );
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded an image!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <Header />
      <h2> Upload Pic </h2>
      <h4> Your name </h4>
      <input type="text" />
      <br />
      Choose a picture:
      <br />
      <input type="file" onChange={handlePictureChange} />
      <br />
      <button onClick={() => uploadPhoto()}> Upload photo </button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Selected"
          style={{ width: "150px", height: "150px" }}
        />
      )}
      <button onClick={() => navigate(`/waitingroom/${id}`)}>
        {" "}
        Go to library{" "}
      </button>
    </div>
  );
};

export default UploadPicRoom;
