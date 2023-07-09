import Axios from "axios";
const base = "http://localhost:3001";
const baseUrl = `${base}/api`;

// Refer to ProductListPage
function getProductsFiltering(sortIndex, rating, categories, priceRange, searchString) {
  let url = `${baseUrl}/products?`;
  switch (sortIndex) {
    case 1: // Price ASC
      url = `${url}&sortfield=price&sortorder=asc`;
      break;
    case 2: // Price DESC
      url = `${url}&sortfield=price&sortorder=desc`;
      break;
    case 3: // Rating ASC
      url = `${url}&sortfield=rating&sortorder=asc`;
      break;
    case 4: // Rating DESC
      url = `${url}&sortfield=rating&sortorder=desc`;
      break;
    default:
  }
  if (rating > 0) {
    url = `${url}&rating=${rating}`;
  }
  if (categories && categories.length > 0) {
    url = `${url}&category=${categories.join(",")}`;
  }
  if (priceRange) {
    const arr = [priceRange.from, priceRange.to];
    url = `${url}&price=${arr.join("-")}`;
  }
  if (searchString) {
    url = `${url}&search=${searchString}`;
  }
  console.log(url);
  return url;
}
export default class Api {
  static async getProduct(pid) {
    try {
      const res = await Axios.get(`${baseUrl}/product/${pid}`);
      return res.data[0];
    } catch (err) {
      throw err;
    }
  }
  static async getProducts(sortIndex, ratingIndex, selectedCategory, priceRange, searchString) {
    const url = getProductsFiltering(sortIndex, ratingIndex, selectedCategory, priceRange, searchString);
    try {
      const res = await Axios.get(url)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async getCategories() {
    try {
      const res = await Axios.get(`${baseUrl}/categories`);
      return res.data
    } catch (err) {
      throw err;
    }
  }
  static async login(username, password) {
    try {
      const body = {
        username,
        password
      };
      const res = await Axios.post(`${baseUrl}/user/login`, body);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async register(username, password, profile, isAdmin) {
    try {
      const body = {
        username,
        password,
        profile,
        isAdmin
      };
      const res = await Axios.post(`${baseUrl}/user/register`, body);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async getComments(pid) {
    try {
      const res = await Axios.get(`${baseUrl}/product/${pid}/comments`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async deleteProduct(pid) {
    try {
      const res = await Axios.delete(`${baseUrl}/product/${pid}`)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async deleteComment(cid) {
    try {
      const res = await Axios.delete(`${baseUrl}/comment/${cid}`)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async addComment(userId, productId, rating, content) {
    try {
      const body = {
        userId, // number
        rating, // number
        content, // string
        productId // number
      };
      const res = await Axios.post(`${baseUrl}/comment`, body);
      // Success gives you the list of comment of the product (including the new one)
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async editComment(cid, rating, content) {
    try {
      const body = {
        rating, // number
        content, // string
      };
      const res = await Axios.post(`${baseUrl}/comment/${cid}`, body);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async addToCart(userId, productId) {
    try {
      const res = await Axios.post(`${baseUrl}/user/${userId}/cart/product/${productId}`, {});
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async removeFromCart(userId, productId) {
    try {
      const res = await Axios.delete(`${baseUrl}/user/${userId}/cart/product/${productId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async updateCart(userId, productId, quantity) {
    try {
      const body = { quantity };
      const res = await Axios.put(`${baseUrl}/user/${userId}/cart/product/${productId}`, body);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async getCartItem(userId, productId) {
    try {
      const res = await Axios.get(`${baseUrl}/user/${userId}/cart/product/${productId}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static async getUserCart(userId) {
    try {
      const res = await Axios.get(`${baseUrl}/user/${userId}/cart`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
  static logError(err) {
    alert(err);
  }
}
