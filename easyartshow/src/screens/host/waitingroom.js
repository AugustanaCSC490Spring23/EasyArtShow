import React, {useState} from 'react'; 
import storage from "../../backend/firebase.js";
import { ref, uploadBytes, getStorage, listAll } from "@firebase/storage";
import ArtBoard from '../../components/ArtBoard.js';

function WaitingRoom() {
    const [imageUrl, setImageUrl] = useState("");
    const randomCodeGenerator = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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
        Waiting Room
        <div>
          Your passcode is {randomCodeGenerator()}
          <br/>
          Share this passcode with your participants
          <br/> 
          <button onClick={() => handlePictureChange}> Upload picture </button>
          <div> 
            <ArtBoard />
          </div>
        </div>
      </div>
    );
  }
  
export default WaitingRoom; 