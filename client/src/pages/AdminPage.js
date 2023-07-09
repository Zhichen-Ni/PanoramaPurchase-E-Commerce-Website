import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../stores/user";
import Api from "../lib/api";
// import "./ProductsPage.css";
// React calls componentDidMount twice in dev mode
export default function AdminPage() {
  const [products, setProducts] = useState([{ product_id: 1, product_name: "Mock Product", price: "0.00" }]);
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin);
  const deleteProduct = (product_id) => {
    Api.deleteProduct(product_id)
      .then(() => {
        Api.getProducts(null, null, null)
          .then(setProducts)
          .catch(Api.logError);
      })
      .catch(Api.logError);
  };
  /* Hook */
  useEffect(() => {
    Api.getProducts(null, null, null)
      .then(setProducts)
      .catch(Api.logError);
  }, []);
  
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Delete product</th>
          </tr>
          {products.map(item => (
            <tr key={item.product_id}>
              <td>{item.product_name}</td>
              <td>${item.price}</td>
              <td>{item.description}</td>
              <td>{item.product_rating}</td>
              <td><button onClick={() => deleteProduct(item.product_id)}>delete product</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}