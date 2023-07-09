import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StarIcon from "../images/StarIcon";
import InputGroup from 'react-bootstrap/InputGroup';
import "./css/ProductFilter.css";

// props: selectedIndex, setSelectedIndex
// props: categories changeCategory
export default function ProductFilter(props) {
  const [priceBegin, setPriceBegin] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [displayErrorForPrice, setDisplayErrorForPrice] = useState(false);
  const handleSelectStarRating = (num) => {
    props.setSelectedIndex((num === props.selectedIndex) ? -1 : num);
  }

  const handleSubmitPriceRange = () => {
    if (priceBegin === "" || priceEnd === "") {
      setDisplayErrorForPrice(true);
    }
    else if (Number(priceBegin) && Number(priceEnd) && Number(priceBegin) <= Number(priceEnd)) {
      setDisplayErrorForPrice(false);
      props.setPriceRange(Number(priceBegin), Number(priceEnd));
    }
    else {
      setDisplayErrorForPrice(true);
    }
  }

  const handleClearPriceRange = () => {
    setDisplayErrorForPrice(false);
    setPriceBegin("");
    setPriceEnd("");
    props.setPriceRange(null, null);
  }

  return (
    <div style={{ minWidth: 220 }}>
      <p className="font-weight-bold" id="filter">Filter by Rating</p>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}>
        <Button variant="light" style={{ marginRight: "40px", marginBottom: "7px", maxWidth: "130px" }} onClick={() => handleSelectStarRating(5)} active={(props.selectedIndex === 5) ? true : false}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </Button>
        <Button variant="light" style={{ marginRight: "40px", marginBottom: "7px", maxWidth: "130px" }} onClick={() => handleSelectStarRating(4)} active={(props.selectedIndex === 4) ? true : false}>
          <div style={{ display: "flex", alignItems: "center", float: "right" }}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            {`&up`}
          </div>
        </Button>
        <Button variant="light" style={{ marginRight: "40px", marginBottom: "7px", maxWidth: "130px" }} onClick={() => handleSelectStarRating(3)} active={(props.selectedIndex === 3) ? true : false}>
          <div style={{ display: "flex", alignItems: "center", float: "right" }}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            {`&up`}
          </div>
        </Button>
        <Button variant="light" style={{ marginRight: "40px", marginBottom: "7px", maxWidth: "130px" }} onClick={() => handleSelectStarRating(2)} active={(props.selectedIndex === 2) ? true : false}>
          <div style={{ display: "flex", alignItems: "center", float: "right" }}>
            <StarIcon />
            <StarIcon />
            {`&up`}
          </div>
        </Button>
      </div>
      <p className="font-weight-bold" id="filter">Filter by Category</p>
      <Form>
        <div style={{ marginBottom: "30px" }}>
          {props.categories.map((item, index) => (
            <Form.Check
              type="checkbox"
              key={item.category_id}
              label={item.category_name}
              onChange={() => props.changeCategory(item.category_id)}
            />
          ))}
        </div>
      </Form>
      <p className="font-weight-bold" id="filter">Filter by Price Range</p>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", maxWidth: "220px" }}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">$</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="from-price"
              placeholder="Min"
              onChange={e => setPriceBegin(e.target.value)}
              value={priceBegin}
            />
          </InputGroup>
          <Form.Label style={{ marginLeft: "5px", marginRight: "5px" }}>to</Form.Label>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">$</InputGroup.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="to-price"
              placeholder="Max"
              onChange={e => setPriceEnd(e.target.value)}
              value={priceEnd}
            />
          </InputGroup>
        </div>
        <Button onClick={handleSubmitPriceRange} style={{ marginLeft: "7px", marginRight: "7px", maxHeight: "35px" }} variant="primary" size="sm">
          Go
        </Button>
        <Button onClick={handleClearPriceRange} style={{ marginLeft: "7px", marginRight: "7px", maxHeight: "35px" }} variant="primary" size="sm">
          Clear
        </Button>
        {displayErrorForPrice && <p className="text-danger">Invalid Price Range</p>}
      </Form>

    </div>
  );
}