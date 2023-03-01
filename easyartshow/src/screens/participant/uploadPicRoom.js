import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  list,
  getDownloadURL,
} from "@firebase/storage";
import { getDatabase,ref as dbRef, set } from "@firebase/database";

const UploadPicRoom = () => {
  const [picture, setPicture] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const storage = getStorage();

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    const filename = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, `easyartshow/rooms/VGxhb4/images/${filename}`);
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
      <h2> Upload Pic </h2>
      <h4> Your name </h4>
      <input type="text" />
      <br />
      Choose a picture:
      <br />
      <input type="file" onChange={handlePictureChange} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Selected"
          style={{ width: "150px", height: "150px" }}
        />
      )}
      <div>{progress}%</div>
    </div>
  );
};

export default UploadPicRoom;
