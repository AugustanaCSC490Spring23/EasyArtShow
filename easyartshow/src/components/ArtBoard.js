/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  ref,
  getStorage,
  deleteObject,
} from "@firebase/storage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import {
  doc,
  getFirestore,
  getDoc,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";
import "./Room/ArtBoard.css"

import CommentBox from "./CommentBox";
const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

function ArtBoard({ id }) {
  const storage = getStorage();
  const listRef = ref(storage, `easyartshow/rooms/${id.toString()}/images/`);
  const [ user, setUser] = useState(null);
  const [imageDirectory, setImageDirectory] = useState([]);
  const auth = getAuth();
  const [userIDMatch, setUserIDMatch] = useState(false);
  const [ roomData, setRoomData] = useState(null);

  const [imageUrlList, setImageUrlList] = useState([]);
  const db = getDatabase();
  const dbFireStore = getFirestore();
  const [imageData, setImageData] = useState([]);
  const docRef = doc(dbFireStore, "rooms", `${id}`);
  const roomRef = dbRef(db, "easyartshow/rooms/");
  const [ captionList, setCaptionList] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  // const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
  //   if (doc.data().images) {
  //    setImageData(doc.data().images);
  //  }
  // });

  function deletePhoto(url) {
    const fireStoreDB = getFirestore();
    const imgRef = doc(fireStoreDB, url);
    deleteDoc(imgRef).then(() => {
      console.log("Document successfully deleted!");
      // window.location.reload();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    // delete photo from storage
    const storageRef = getStorage();
    console.log("url", url);
    const desertRef = ref(storageRef, url.replace("rooms/", "easyartshow/rooms/"));
    deleteObject(desertRef)
      .then(() => {
        console.log("Document successfully deleted!");
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
            setUserIDMatch(roomData.hostid === user.uid.toString());
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
