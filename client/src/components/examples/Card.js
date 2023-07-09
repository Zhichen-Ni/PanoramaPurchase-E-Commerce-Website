import React from "react";
import Counter from "./Counter"

export default function Card(props) {
  return (
    <div className="card" style={{width: '18rem'}}>
      <img className="card-img-top" src="logo192.png" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h5 className="card-title2">{props.price}</h5>
        <p className="card-text">{props.description}</p>
        <div><Counter></Counter></div>
      </div>
    </div>
  );
}

