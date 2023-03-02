import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

function QRCodeComponent() {
  const { id } = useParams();
  const waitingRoomLocation = window.location.href.replace(`qrcode/${id}`, `waitingroom/${id}`); 

  return (
    <div>
      <h1> QR Code: </h1>

      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 300,
          width: "100%",
        }}
      >
        <br />
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={waitingRoomLocation}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
}

export default QRCodeComponent;