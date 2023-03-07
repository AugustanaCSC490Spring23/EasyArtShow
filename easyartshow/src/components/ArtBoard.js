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


function ArtBoardComponent({
  id,
  user,
  isSlideShow,
  swichView,
  imageUrlList,
  imageDirectory,
  // userIDMatch
}) {
  return (
    <div>
      Art Board
      <button onClick={() => swichView()}>View Slide Show</button>
      {!isSlideShow ? (
        <div class="topContainer">
          {imageUrlList &&
            imageUrlList.map((url, index) => (
              <div>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  style={{ width: "150px", height: "150px" }}
                />
                {user ? (
                  <button onClick={() => deletePhoto(imageDirectory[index])}>
                    {" "}
                    delete{" "}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      ) : (
        <SlideShow
          imageUrlList={imageUrlList}
          imageDirectory={imageDirectory}
          // userIDMatch={userIDMatch}
        />
      )}
    </div>
  );
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

  onAuthStateChanged(auth, (user) => {
    setUser(user);

    // onValue(roomRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setRoomData(data);
    // });

    // if (user !== null && roomData !== null) {
    //   console.log("User logged in!");
    //   setUserIDMatch(roomData[id.toString()].hostid.toString() === user.uid.toString());
    // }
  });

  // useEffect(() => {
  //   // const urlList = async () => {
  //   //   list(listRef).then((res) => {
  //   //     const imagePromises = res.items.forEach((itemRef) => {
  //   //       setImageDirectory((currenState) => [
  //   //         ...currenState,
  //   //         itemRef._location.path_,
  //   //       ]);
  //   //       const imageURL = getDownloadURL(
  //   //         ref(storage, itemRef._location.path_)
  //   //       );

  //   //       imageURL.then(function (url) {
  //   //         setImageUrlList((currenState) => [...currenState, url.toString()]);
  //   //       });

  //   //       const imageMetadata = getMetadata(
  //   //         ref(storage, itemRef._location.path_)
  //   //       );
  //   //       imageMetadata.then(function (metadata) {
  //   //         // console.log(metadata);
  //   //       });
  //   //     });
  //   //   });
  //   // };

  //   // urlList();
  // }, []);

  const swichView = () => {
    setIsSlideShow(!isSlideShow);
  };

  return (
    <div>
      {user || userIDMatch ? (
        <ArtBoardComponent
          id={id}
          user={user}
          isSlideShow={isSlideShow}
          swichView={swichView}
          imageUrlList={imageUrlList}
          imageDirectory={imageDirectory}
        />
      ) : (
        <ArtBoardComponent
        id={id}
        user={user}
        isSlideShow={isSlideShow}
        swichView={swichView}
        imageUrlList={imageUrlList}
        imageDirectory={imageDirectory}
      />
      )}
    </div>
  );
}

export default ArtBoard;
