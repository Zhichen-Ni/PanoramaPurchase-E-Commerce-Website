import React from "react";
import Axios from "axios";
import "./ProductsPage.css";
import ProductFilters from "./ProductFilters";
import ProductFilterBar from "./ProductFilterBar";
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
    // Index based on ProductFilters sortOptions
    this.setState({ selected: index });
    this.getProduct(index);
  }
  getProduct = (selected) => {
    let url = "http://localhost:3001/api/products";
    switch (selected) {
      case 1: // Price ASC
        url = `${url}?sortfield=price&sortorder=asc`;
        break;
      case 2: // Price DESC
        url = `${url}?sortfield=price&sortorder=desc`;
        break;
      case 3: // Rating ASC
        url = `${url}?sortfield=rating&sortorder=asc`;
        break;
      case 4: // Rating DESC
        url = `${url}?sortfield=rating&sortorder=desc`;
        break;
      default: // NON
        url = "http://localhost:3001/api/products";
    }
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
  deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/api/product/${id}`)
      .then(res => {
        alert("Prodcut removed");
        this.getProduct(this.state.selected);
      })
      .catch(err => {
        alert("Failed to delete product");
      });
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ProductFilters value={this.state.selected} onChange={this.handleSelectChange} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ProductFilterBar />
          <table>
            <tbody>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Delete product</th>
              </tr>
              {this.state.products.map(item => (
                <tr key={item.product_id}>
                  <td>{item.product_name}</td>
                  <td>${item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.product_rating}</td>
                  <td><button onClick={() => this.deleteProduct(item.product_id)}>delete product</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
