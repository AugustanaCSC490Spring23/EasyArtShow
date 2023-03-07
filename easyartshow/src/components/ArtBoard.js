/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  list,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from "@firebase/storage";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import "react-slideshow-image/dist/styles.css";
import { getDatabase, ref as dbRef, onValue } from "@firebase/database";
import SlideShow from "./SlideShow";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

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
  const [user, setUser] = useState(null);
  const [isSlideShow, setIsSlideShow] = useState(false);
  const [imageDirectory, setImageDirectory] = useState([]);
  const auth = getAuth();
  const [userIDMatch, setUserIDMatch] = useState(false);
  const [roomData, setRoomData] = useState(null);

  const [imageUrlList, setImageUrlList] = useState([]);
  const db = getDatabase();

  const roomRef = dbRef(db, "easyartshow/rooms/");

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
    const urlList = async () => {
      list(listRef).then((res) => {
        const imagePromises = res.items.forEach((itemRef) => {
          setImageDirectory((currenState) => [
            ...currenState,
            itemRef._location.path_,
          ]);
          const imageURL = getDownloadURL(
            ref(storage, itemRef._location.path_)
          );

          imageURL.then(function (url) {
            setImageUrlList((currenState) => [...currenState, url.toString()]);
          });

          const imageMetadata = getMetadata(
            ref(storage, itemRef._location.path_)
          );
          imageMetadata.then(function (metadata) {
            // console.log(metadata);
          });
        });
      });
    };

    urlList();
  }, []);

  const swichView = () => {
    setIsSlideShow(!isSlideShow);
  };

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div>
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        {imageUrlList && imageUrlList.map((url, index) => (
          <a href = {url} key={index}>
            <img src={url} alt={`${index}`} style={{ width: "250px", height: "250px" }}/>
            {userIDMatch ? ( <button onClick={() => deletePhoto(imageDirectory[index])}>delete</button> ) : ( <></> )}
          </a>
        ))}
      </LightGallery>
    </div>
  );
}

export default ArtBoard;
