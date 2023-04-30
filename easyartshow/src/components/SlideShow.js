import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getFirestore,
  onSnapshot
} from "@firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./Room/SlideShow.css";

const SlideShow = () => {
  const { id }= useParams();
  const dbFireStore = getFirestore();
  const [imageData, setImageData] = useState([]);
  
  const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
    if (doc.data().images) {
      setImageData(doc.data().images);
    }
  });

    return (
    <>
      <Carousel 
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        autoFocus={true}
        stopOnHover={false}
        useKeyboardArrows={true}
      >
        {imageData &&
          imageData.map((item) => (
            <div>
              <img
                src={item.imageUrl}
                alt={item.artTitle}
              />
            </div>
          ))}
      </Carousel>
    </>
  );
}

export default SlideShow;
