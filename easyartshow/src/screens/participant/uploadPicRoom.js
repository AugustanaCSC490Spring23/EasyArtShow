import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getStorage } from "@firebase/storage";

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
    const filename = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, `easyartshow/images/${filename}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded an image!');
      window.location.reload();

    }).catch((error) => {
      console.error('Error uploading image:', error);
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
