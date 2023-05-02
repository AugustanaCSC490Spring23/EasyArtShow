import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading({ loadingState }) {
  return (
    <div>
      <ClipLoader
        // cssOverride={override}
        size={150}
        color={"#123abc"}
        loading={loadingState}
        speedMultiplier={1.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1> Loading.... </h1>
    </div>
  );
}

export default Loading;
