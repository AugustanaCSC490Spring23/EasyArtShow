import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  };

  return (
    <div>
      Choose a picture:
      <input type="image" alt="Upload pic" onChange={handlePictureChange} />
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
