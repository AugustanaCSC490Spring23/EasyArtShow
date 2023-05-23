import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./SlideShow.css";

const SlideShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const dbFireStore = getFirestore();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState([]);
  const slideShowStates = location.state.slideShowStates;

  useEffect(() => {
    const unsub = onSnapshot(doc(dbFireStore, "rooms", `${id}`), (doc) => {
      if (doc.data().images) {
        setImageData(doc.data().images);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button onClick={() => navigate(-1)}> Back </button>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        autoPlay={slideShowStates.autoPlay}
        infiniteLoop={slideShowStates.infiniteLooping}
        interval={slideShowStates.slideDuration}
        useKeyboardArrows={true}
      >
        {imageData &&
          imageData.map((item) => (
            <div className="slide-item">
              <div id="slide-background-div">
                {slideShowStates.includeBackground ? (
                  <img
                    src={item.imageUrl}
                    alt={item.artTitle}
                    id="slide-background"
                  />
                ) : (
                  <></>
                )}
                <img
                  src={item.imageUrl}
                  alt={item.artTitle}
                  id="slide-img"
                  className={
                    slideShowStates.includeBackground ? "position-absolute" : ""
                  }
                />
              </div>
              <span className="title-span">
                <h2
                  className={
                    slideShowStates.includeTitle ? "title" : "display-none"
                  }
                >
                  {item.artTitle}
                </h2>
                {/* <h2
                  className={
                    slideShowStates.includeDescription
                      ? "description"
                      : "display-none"
                  }
                >
                  The quick, brown fox jumps over a lazy dog. DJs flock by when
                  MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds
                  jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick
                  jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs
                  jumpy veldt fox. Bright vixens
                </h2> */}
                <h2
                  className={
                    slideShowStates.includeContributor
                      ? "description"
                      : "display-none"
                  }
                >
                  Contributed by: {item.participantName}
                </h2>
              </span>
            </div>
          ))}
      </Carousel>
    </>
  );
};

export default SlideShow;
