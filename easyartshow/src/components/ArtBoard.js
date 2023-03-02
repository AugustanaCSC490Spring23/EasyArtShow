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
import { Slide } from "react-slideshow-image";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";

import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
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
function SlideShow({ imageUrlList, imageDirectory }) {
  return (
    <div className="slide-container">
      <Slide>
        {imageUrlList &&
          imageUrlList.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle }}>
                <img
                  src={slideImage}
                  alt={`Image ${index}`}
                  style={{ width: "400px", height: "400px" }}
                />
                {/* <h4> Hello </h4> */}
                {/* <span style={spanStyle}>Hello</span> */}
                <button onClick={() => deletePhoto(imageDirectory[index])}>
                  {" "}
                  delete{" "}
                </button>
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
}

function ArtBoardComponent({
  id,
  user,
  isSlideShow,
  swichView,
  imageUrlList,
  imageDirectory,
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

  const [imageUrlList, setImageUrlList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []); // This will only listen to changes on value

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
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

  return (
    <div>
      {user ? (
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
