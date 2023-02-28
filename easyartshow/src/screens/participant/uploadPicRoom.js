import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../../backend/firebase.js";
import { ref, uploadBytes } from "@firebase/storage";

const UploadPicRoom = () => {
  const [picture, setPicture] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const storageRef = ref(storage, `easyartshow/images/${file.name}`)
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask().then((snapshot) => {
      console.log('Uploaded an image!');
    });

  };

  return (
    <div>
      Choose a picture:
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
