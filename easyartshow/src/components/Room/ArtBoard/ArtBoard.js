/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { ref, getStorage, deleteObject } from "@firebase/storage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref as dbRef } from "@firebase/database";
import { doc, getFirestore, getDoc, onSnapshot, deleteDoc } from "@firebase/firestore";
import "./ArtBoard.css"

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

function ArtBoard({ id }) {
  const auth = getAuth();
  const dbFireStore = getFirestore();
  const docRef = doc(dbFireStore, "rooms", `${id}`);

  const [ user, setUser] = useState(null);
  const [userIDMatch, setUserIDMatch] = useState(false);
  const [ roomData, setRoomData] = useState(null);
  const [imageData, setImageData] = useState([]);

  const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
    if (doc.data().images) {
      setImageData(doc.data().images);
    }
  });

  function deletePhoto(url) {
    /**
     * delete photo from database
     * 
     * @param {string} url - url of the photo to be deleted.
     * 
     * @returns {void}
     */
    const fireStoreDB = getFirestore();
    const storageRef = getStorage();
    const desertRef = ref(storageRef, url.replace("rooms/", "easyartshow/rooms/"));
    const imgRef = doc(fireStoreDB, url);

    deleteDoc(imgRef).then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    deleteObject(desertRef)
      .then(() => {
        console.log("Document successfully deleted!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
        const waitDoc = async () => {
          if (user) {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRoomData(docSnap.data());
            if (roomData) {
              setUserIDMatch(roomData.hostid === user.uid.toString());
            }
          } else {
            console.log("No such document!");
          }
        };
       
      }; 
      waitDoc();
    });
  }, []);

  return (
    <div>
      {
        imageData &&
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
        )) 
      }
    </div>
  );
}

export default ArtBoard;
