const _ = require("lodash");
const User = require("../database/User");
function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return res.send("Failed to login");
  }
  User.getUserByName(username, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    if (results.length === 1 && results[0].password === password) {
      res.status(200);
      const user = results[0];
      delete user.password;
      return res.send(user);
    }
    res.status(400);
    return res.send("Failed to login");
  });
};

function register(req, res) {
  const { username, password, profile, isAdmin } = req.body;
  if (!_.isString(username) || !_.isString(password) || !_.isString(profile) || !_.isBoolean(isAdmin)) {
    res.status(400);
    return res.send("Bad Input");
  }
  if (username.length > 20) {
    res.status(400);
    return res.send("Username too long");
  }
  User.insertUser(username, password, profile, isAdmin, (err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.send(results);
  });
}

module.exports = {
  login, register
};