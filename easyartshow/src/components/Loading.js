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
      <h2 className=".headtext__major"> Loading.... </h2>
    </div>
  );
}

export default Loading;
