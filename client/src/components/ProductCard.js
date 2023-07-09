/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import "./css/ProductCard.css";
import StarIcon from "../images/StarIcon";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/user";
import Api from "../lib/api";
import { selectDarkMode } from "../stores/state";
import handleDarkModeChange from "../lib/darkmode";

function PrintStars(props) {
  const isDark = useSelector(selectDarkMode);
  useEffect(() => {
    handleDarkModeChange(isDark)
  }, [isDark]);
  useEffect(() => {
    handleDarkModeChange(isDark);
  });
  const num = Math.round(parseFloat(props.number));
  if (num === 6) {
    return <div id="rating">{props.number}<StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
  } else if (num === 5) {
    return <div id="rating">{props.number}<StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
  } else if (num === 4) {
    return <div id="rating">{props.number}<StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
  } else if (num === 3) {
    return <div id="rating">{props.number}<StarIcon /><StarIcon /><StarIcon /></div>
  } else if (num === 2) {
    return <div id="rating">{props.number}<StarIcon /><StarIcon /></div>
  } else if (num === 1) {
    return <div id="rating">{props.number}<StarIcon /></div>
  }
  return <div id="rating">{props.number}</div>
}

// props: name price description
export default function ProductCard(props) {
  const user = useSelector(selectUser);
  const addUpdateCart = () => {
    const product_id = props.product_id;
    const user_id = user?.user_id;
    Api.getCartItem(user_id, product_id)
      .then(res => {
        if (res.length === 0) {
          Api.addToCart(user_id, product_id);
        } else {
          Api.updateCart(user_id, product_id, res[0].quantity + 1);
        }
      })
      .catch(err => {
        if (err.response) {
          alert("Login Failed");
        } else
          alert("Failed to retrieve products");
      });
  }
  const navigate = useNavigate();
  return (
    <div className="card product-card" style={{ width: '18rem' }}>
      <div className="container">
        <img className="card-img-top" src={props.image} id="img1" alt="no image available" />
        <Button className="button button1" id="button" onClick={addUpdateCart}>+</Button>
      </div>
      <div className="card-body">
        <h5 className="price" id="price">${props.price}</h5>
        <h5 className="card-title" id="para0" onClick={() => { navigate(`/product/${props.product_id}`) }}>{props.name}</h5>
        <p className="card-text" id="para">{props.description}</p>
        <h5 className="rating">
          <PrintStars number={props.rating} />
        </h5>
      </div>
    </div>
  );
}

