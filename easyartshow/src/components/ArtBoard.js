/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  ref,
 
  getStorage,
  
  list,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "@firebase/storage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

import "react-slideshow-image/dist/styles.css";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import {
  doc,
  getDocFromCache,
  getFirestore,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  deleteField,
} from "@firebase/firestore";
import SlideShow from "./SlideShow";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgComment from "lightgallery/plugins/comment";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { nanoid } from "nanoid";

import CommentBox from "./CommentBox";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

function ArtBoard({ id }) {
  const storage = getStorage();
  const listRef = ref(storage, `easyartshow/rooms/${id.toString()}/images/`);
  const [ setUser] = useState(null);
  
  const [setImageDirectory] = useState([]);
  const auth = getAuth();
  const [userIDMatch, setUserIDMatch] = useState(false);
  const [ setRoomData] = useState(null);

  const [imageUrlList, setImageUrlList] = useState([]);
  const db = getDatabase();
  const dbFireStore = getFirestore();
  const [imageData, setImageData] = useState([]);
  const docRef = doc(dbFireStore, "rooms", `${id}`);
  const roomRef = dbRef(db, "easyartshow/rooms/");
  const [ setCaptionList] = useState([]);

  const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
    setImageData(doc.data().images);
  });

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
        // window.location.reload();
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
            console.log("Document data:", roomData.hostid);
            setUserIDMatch(roomData.hostid === user.uid.toString());
          } else {
            console.log("No such document!");
          }
        };
       
      }; 
      waitDoc();
    });
  }, []);
  const swichView = () => {
    setIsSlideShow(!isSlideShow);
  };

  const onInit = () => {};

  return (
    <div>
      {/* {imageData.length > 0 && (
        <text> Click on the image to view the full screen. </text>
      )} */}
      {/* <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[ lgZoom, lgAutoplay, lgFullscreen]}
      > */}
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
            {/* {userIDMatch && (
              <button onClick={() => deletePhoto(item.imageRef)}>delete</button>
            )} */}
          </a>
        ))}
      {/* </LightGallery> */}
      {/* <br />
      <br />
      <br />
      <div>{imageData.length > 0 && <CommentBox />}</div> */}
    </div>
  );
}

export default ArtBoard;
