const _ = require("lodash");
const ShoppingCart = require("../database/ShoppingCart");
function getCartByUser(req, res) {
  const uid = req.params["user_id"];
  ShoppingCart.getByUserId(uid, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
}
function getCartItem(req, res) {
  const uid = req.params["user_id"];
  const pid = req.params["product_id"];
  ShoppingCart.getById(uid, pid, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  })
}
function addToCart(req, res) {
  const uid = req.params["user_id"];
  const pid = req.params["product_id"];
  ShoppingCart.insert(uid, pid, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    ShoppingCart.getByUserId(uid, (err, results) => {
      if (err) {
        res.status(500);
        return res.send("Database Error");
      }
      res.status(201);
      return res.send(results);
    });
  });
}
function updateCart(req, res) {
  const uid = req.params["user_id"];
  const pid = req.params["product_id"];
  const { quantity } = req.body;
  ShoppingCart.updateById(uid, pid, quantity, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    ShoppingCart.getByUserId(uid, (err, results) => {
      if (err) {
        res.status(500);
        return res.send("Database Error");
      }
      res.status(200);
      return res.send(results);
    });
  });
}
function deleteFromCart(req, res) {
  const uid = req.params["user_id"];
  const pid = req.params["product_id"];
  ShoppingCart.delete(uid, pid, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    ShoppingCart.getByUserId(uid, (err, results) => {
      if (err) {
        res.status(500);
        return res.send("Database Error");
      }
      res.status(200);
      return res.send(results);
    });
  });
}

module.exports = {
  getCartByUser,
  getCartItem,
  addToCart,
  updateCart,
  deleteFromCart
};