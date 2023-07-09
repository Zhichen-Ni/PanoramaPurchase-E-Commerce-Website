import React from "react";
import "./css/Comment.css";
// props: user_name rating updated_time content
export default function Comment(props) {
  return (
    <div className="row">
      <div className="col">{props.user_name}</div>
      <div className="col">{props.rating}</div>
      <div className="col">{props.updated_time}</div>
      <div className="col">{props.content}</div>
    </div>
  );
}