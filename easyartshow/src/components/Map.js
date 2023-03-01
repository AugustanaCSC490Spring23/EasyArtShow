import React from "react";
import GoogleMapReact from "google-map-react";
import { useGeolocated } from "react-geolocated";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${
        0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
    }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(
        degrees,
        isLongitude,
    )}`;

function Map() {
  const {
    coords,
    getPosition,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const defaultProps = {
    center: {
      lat: 35.792389,
      lng: -85.613213,
    },
    zoom: 11,
  };
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div style={{ height: "100vh", width: "100%" }}>
        <h2> Current location:  {formatDegrees(coords.latitude, false)} {formatDegrees(coords.longitude, false)}</h2>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={41.5015176} lng={-90.5532989} text="My Place" />
      </GoogleMapReact>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

export default Map;
