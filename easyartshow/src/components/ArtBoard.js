import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getStorage,
  listAll,
  list,
  getDownloadURL,
} from "@firebase/storage";
import { Slide } from "react-slideshow-image";
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

function SlideShow({ imageUrlList }) {
  return (
    <div className="slide-container">
      <Slide>
        {imageUrlList &&
          imageUrlList.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle }}>
                <img
                  src={slideImage}
                  alt="Selected"
                  style={{ width: "400px", height: "400px" }}
                />
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
}

function ArtBoard() {
  const storage = getStorage();
  const listRef = ref(storage, "easyartshow/images");
  const [isSlideShow, setIsSlideShow] = useState(false);

  const [imageUrlList, setImageUrlList] = useState([]);

  useEffect(() => {
    const urlList = async () => {
      list(listRef).then((res) => {
        const imagePromises = res.items.forEach((itemRef) => {
          const imageURL = getDownloadURL(
            ref(storage, itemRef._location.path_)
          );

          imageURL.then(function (url) {
            setImageUrlList((currenState) => [...currenState, url.toString()]);
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
      Art Board
      <button onClick={() => swichView()}>View Slide Show</button>
      {!isSlideShow ? (
        <div class="topContainer">
          {imageUrlList &&
            imageUrlList.map((url, index) => (
              <li key={index}>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  style={{ width: "150px", height: "150px" }}
                />
              </li>
            ))}
        </div>
      ) : (
        <SlideShow imageUrlList={imageUrlList} />
      )}
    </div>
  );
}

export default ArtBoard;
