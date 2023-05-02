/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { ref, getStorage, deleteObject } from "@firebase/storage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import {
  doc,
  getFirestore,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "react-slideshow-image/dist/styles.css";
import "./ArtBoard.css";

import CommentBox from "../../CommentBox";


function ArtBoard({ id }) {
  const [user, setUser] = useState(null);
  const [userIDMatch, setUserIDMatch] = useState(false);
  const [roomData, setRoomData] = useState(null); 
  const [imageData, setImageData] = useState([]);

  const auth = getAuth();
  const dbFireStore = getFirestore();
  const docRef = doc(dbFireStore, "rooms", `${id}`);

  const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
    setImageData(doc.data().images);
  });

  const deletPhotoFromFireStore = (url) => {
    const fireStoreDB = getFirestore();
    const imgRef = doc(fireStoreDB, url);
    deleteDoc(imgRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deletePhotoFromStorage = (url) => {
    const storageRef = getStorage();
    console.log("url", url);
    const desertRef = ref(
      storageRef,
      url.replace("rooms/", "easyartshow/rooms/")
    );
    deleteObject(desertRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const deletePhoto = (url) => {
    deletPhotoFromFireStore(url);
    deletePhotoFromStorage(url);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      const waitDoc = async () => {
        if (user) {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRoomData(docSnap.data());
            setUserIDMatch(roomData.hostid === user.uid.toString());
          } else {
            console.log("No such document!");
          }
        }
      };
      waitDoc();
    });
  }, []);

  return (
    <div>
      {imageData &&
        imageData.map((item) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={item.imageStamp}
            data-sub-html={`<h4>${item.timeCreatedFullFormat}</h4><p><b>${item.participantName}</b></p>`}
          >
            <img
              src={item.imageUrl}
              alt={item.artTitle}
              style={{ width: "250px", height: "250px" }}
            />
            {userIDMatch && (
              <button onClick={() => deletePhoto(item.imageRef)}>delete</button>
            )}
          </a>
        ))}
    </div>
  );
}

export default ArtBoard;
