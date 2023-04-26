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

function deletePhoto(url) {
  // delete photo)
  const storage = getStorage();
  const imgRef = ref(storage, url);
  deleteObject(imgRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted successfully");
      window.location.reload();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
}

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
    setImageData(doc.data().images);
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      onValue(roomRef, (snapshot) => {
        setUser(user);
        const data = snapshot.val();
        setRoomData(data);

        if (user !== null && data !== null) {
          console.log("User logged in!");
          setUserIDMatch(
            data[id.toString()].hostid.toString() === user.uid.toString()
          );
        }
      });
    });
  }, []);

  return (
    <div>
      {/* {imageData.length > 0 && (
        <text> Click on the image to view the full screen. </text>
      )} */}
      {/* <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgComment, lgFullscreen]}
      > */}
        {imageData &&
          imageData.map((item) => (
            <a
              href={item.imageURL}
              key={item.id}
              data-sub-html={`<h4>${item.timeCreatedFullFormat}</h4><p><b>${item.participantName}</b></p>`}
            >
              <img
                src={item.imageUrl}
                alt={item.artTitle}
                style={{ width: "250px", height: "250px" }}
              />

              {userIDMatch ? (
                <button onClick={() => deletePhoto(item.imageRef)}>
                  delete
                </button>
              ) : (
                <></>
              )}
            </a>
          ))}
      {/* </LightGallery> */}
      <br />
      <br />
      <br />
      <div>{imageData.length > 0 && <CommentBox />}</div>
    </div>
  );
}

export default ArtBoard;
