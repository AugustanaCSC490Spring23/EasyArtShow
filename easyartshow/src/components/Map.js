import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map() {
  const defaultProps = {
    center: {
      lat: 35.792389,
      lng: -85.613213,
    },
    zoom: 11,
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={35.792389} lng={-85.613213} text="My Place" />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
