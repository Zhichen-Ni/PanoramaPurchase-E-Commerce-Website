
const Category = require("../database/Category");
function getAllCategory(req, res) {
  Category.getAll((err, results) => {
    if (err) {
      res.status(500);
      return res.send("Database Error");
    }
    res.status(200);
    return res.send(results);
  });
};


module.exports = {
  getAllCategory
};