import { Slide } from "react-slideshow-image";
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

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

function SlideShow({ imageUrlList, imageDirectory, userIDMatch }) {
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
  return (
    <div className="slide-container">
      <Slide>
        {imageUrlList &&
          imageUrlList.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle }}>
                <img
                  src={slideImage}
                  alt={`${index}`}
                  style={{ width: "400px", height: "400px" }}
                />
                {userIDMatch ? (
                  <button onClick={() => deletePhoto(imageDirectory[index])}>
                    delete
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
}

export default SlideShow;
