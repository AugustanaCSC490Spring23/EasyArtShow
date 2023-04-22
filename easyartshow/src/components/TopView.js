import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const top3 = ["BZWXdT", "CLyofb", "QDdLfW"];

function SingleRoom({ id }) {
    const navigate = useNavigate();
  
    return (
      <div>
        <h3>Code: {id} </h3>
        <button onClick={() => navigate(`/waitingroom/${id}`)}>Join room</button>
      </div>
    );
  }

function TopView() {
  return (
    <div>
      <h1> Top 3 rooms to join: </h1>
      <br />
      {top3.map((id) => (
        <SingleRoom id={id} />
    ))}
    </div>
  );
}



export default TopView;
