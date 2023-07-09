/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Axios from "axios";
import Counter1 from "./Counter1"
// React calls componentDidMount twice in dev mode
export default class ServerCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], selected: "0" };
  }
  // Lifecycle
  componentDidMount() {
    this.getProduct();
  }
  // Handler
  handleSelectChange = (index) => {
    this.setState({ selected: index });
    this.getProduct(index);
  }
  getProduct = (selected) => {
    let url = "http://localhost:3001/api/products";
    Axios.get(url)
      .then(res => {
        this.setState((state, props) => ({
          products: res.data
        }));
      })
      .catch(err => {
        alert("Failed to retrieve products");
      });
  }
  render() {
    return (
      <div className="flex-container">
        {this.state.products.map(item => (
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="logo192.png" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title0">{item.product_id}</h5>
              <h5 className="card-title1">{item.product_name}</h5>
              <h5 className="card-title2">${item.price}</h5>
              <div><Counter1></Counter1></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}