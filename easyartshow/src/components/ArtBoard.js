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
import { nanoid } from "nanoid";

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
  const [imageMetadataList, setImageMetadataList] = useState([]);
  const db = getDatabase();
  const [imageData, setImageData] = useState([]);

  const roomRef = dbRef(db, "easyartshow/rooms/");
  const [captionList, setCaptionList] = useState([]);

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
        const imagePromises = res.items.forEach((itemRef, index) => {
          const path = itemRef._location.path_;

          setImageDirectory((currenState) => [...currenState, path]);

          const imageURL = getDownloadURL(ref(storage, path));

          imageURL.then(function (url) {
            setImageUrlList((currenState) => [...currenState, url.toString()]);
            const imageMetadata = getMetadata(ref(storage, path));
            imageMetadata.then(function (metadata) {
              const title = metadata.customMetadata.artTitle;
              const participantName = metadata.customMetadata.participantName;
              const caption = "Name: " + participantName + " - Title: " + title;
              setCaptionList((currenState) => [...currenState, caption]);

              const id = nanoid();
              setImageData((currenState) => [
                ...currenState,
                {
                  id: id,
                  imageURL: url.toString(),
                  caption: caption,
                  imageRef: path,
                },
              ]);
            });
          });
        });
      });
    };

    urlList();
  }, []);

  const swichView = () => {
    setIsSlideShow(!isSlideShow);
  };

  const onInit = () => {};
  console.log(imageData)

  return (
    <div>
      {imageUrlList.length > 0 && (
        <text> Click on the image to view the full screen. </text>
      )}
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        {imageData &&
          imageData.map((item) => (
            <a href={item.imageURL} key={item.id}>
              <img
                src={item.imageURL}
                alt={item.caption}
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
      </LightGallery>
    </div>
  );
}

export default ArtBoard;
