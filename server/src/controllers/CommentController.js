const _ = require("lodash");
const Comment = require("../database/Comment");
function addComment(req, res) {
  const { userId, rating, content, productId } = req.body;
  if (!_.isString(content) || !_.isNumber(rating) ||
    !_.isNumber(userId) || !_.isNumber(productId)) {
    res.status(400);
    return res.send(JSON.stringify(req.body));
  }
  const updateTime = new Date();
  Comment.insert(rating, updateTime, content, userId, productId, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.send(results);
  });
}
function getByProductId(req, res) {
  Comment.getByProductId(req.params["product_id"], (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};
function getByUserId(req, res) {
  Comment.getByUserId(req.params["user_id"], (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};
function deleteById(req, res) {
  Comment.deleteById(req.params["comment_id"], (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
}
function editComment(req, res) {
  const commentId = req.params["comment_id"];
  const { rating, content } = req.body;
  if (!_.isString(content) || !_.isNumber(rating)) {
    res.status(400);
    return res.send("Bad Input");
  }
  const updateTime = new Date();
  Comment.updateById(commentId, content, rating, updateTime, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.send(results);
  });
}

module.exports = {
  getByProductId, getByUserId, deleteById, addComment, editComment
};