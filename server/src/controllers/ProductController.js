
const Product = require("../database/Product");
const _ = require("lodash");
// Get list of product, supports sorting usring query string, case sensitive
//   eg. ?sortfield=rating&sortorder=asc
const supported = {
  sortFields: ["rating", "price"],
  sortOrder: ["asc", "desc"]
};
function getAllProduct(req, res) {
  const options = { filter: null };
  // Sort option  - sortfield=rating&sortorder=asc
  // ignore order of field is invalid; if no order/invalid order, default to asc
  const sortField = supported.sortFields.find(v => v === req.query.sortfield?.toLowerCase());
  let sortOrder = supported.sortOrder.find(v => v === req.query.sortorder?.toLowerCase());
  if (!sortOrder) sortOrder = "asc";
  if (sortField) {
    options.sort = { [sortField]: sortOrder === "asc" };
  }
  // Rating filer
  let rating = req.query.rating
  if (rating && !_.isNaN(_.toNumber(rating))) {
    rating = _.toNumber(rating);
    if (!options.filter) options.filter = {};
    options.filter.rating = rating;
  }
  // Category filter - category=100,200,300
  // Ignore non number value, empty value
  let category = req.query.category;
  if (category) {
    category = category.split(",");
    category = category.filter(v => !_.isNaN(_.toNumber(v)) && v.length > 0);
    if (category.length > 0) {
      if (!options.filter) options.filter = {};
      options.filter.category = category;
    }
  }
  // Price Filter - price=1-2 / price=-2 / price=1-
  // Ignore invalid input (not a number, has negative)
  let price = req.query.price;
  if (price) {
    price = price.split("-");
    if (price.length === 2) {
      let from = _.toNumber(price[0]), to = _.toNumber(price[1]);
      if (!from) from = null;
      if (!to) to = null;
      if (!options.filter) options.filter = {};
      options.filter.price = { from: from, to: to };
    }
  }
  // Search Filter
  let search = req.query.search;
  if (search) {
    if (!options.filter) options.filter = {};
    options.filter.search = search;
  }
  // Call database
  Product.getAll(options, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};
function getProductById(req, res) {
  Product.getById(req.params["product_id"], (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};
function deleteProductById(req, res) {
  Product.deleteById(req.params["product_id"], (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};

module.exports = {
  getAllProduct, getProductById, deleteProductById
};