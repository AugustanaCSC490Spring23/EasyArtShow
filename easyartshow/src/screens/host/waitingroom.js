import React, { useState } from "react";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from "../../components/ArtBoard.js";
import { useNavigate } from "react-router-dom";

function WaitingRoom() {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const navigate = useNavigate();

  const randomCodeGenerator = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    const filename = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, `easyartshow/images/${filename}`);
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
      Waiting Room
      <div>
        Your passcode is {randomCodeGenerator()} 
        <br />
        <button onClick={() => navigate('/map')}>View map</button>
        <br />
        Share this passcode with your participants
        <br />
        Upload picture
        <input type="file" onChange={handlePictureChange} />
        <div>
          <ArtBoard />
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
