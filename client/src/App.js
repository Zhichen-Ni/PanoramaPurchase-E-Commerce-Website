import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage"
import ExamplePage from "./pages/ExamplePage";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/user/CartPage"
import Navigation from "./components/Navigation";
import "./App.css"

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./stores/state";
import handleDarkModeChange from "./lib/darkmode";

function App() {
  const isDark = useSelector(selectDarkMode);
  useEffect(() => {
    handleDarkModeChange(isDark)
  }, [isDark]);
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/products" element={<ProductListPage />} ></Route>
          <Route path="/product/:product_id" element={<ProductPage />} ></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/cart" element={<CartPage />} ></Route>
          <Route path="/user" element={<Home />} ></Route>
          <Route path="/admin" element={<AdminPage />} ></Route>
          <Route path="/example" element={<ExamplePage />}></Route>
          <Route path="*" element={<NoPage />} />
          <Route path="/404" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
