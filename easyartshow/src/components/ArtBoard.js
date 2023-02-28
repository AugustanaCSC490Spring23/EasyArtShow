import React from "react";
import { ref, uploadBytes, getStorage, listAll, getDownloadURL } from "@firebase/storage";

function ArtBoard() {
  const storage = getStorage();
  const listRef = ref(storage, "easyartshow/images");
  const listAllPics = () => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log(itemRef._location.path_);
          getDownloadURL(ref(storage, itemRef._location.path_)).then((url) => {
            // Or inserted into an <img> element:
           console.log(url);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  listAllPics();

  return (
    <div>
      Art Board
      <div class="topContainer">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/easyartshow-2dbd2.appspot.com/o/easyartshow%2Fimages%2FIMG_2792.jpeg?alt=media&token=5bf30843-3de1-4d68-88d8-3e066aaa2fba"
          }
          alt="image"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
    </div>
  );
}

export default ArtBoard;
