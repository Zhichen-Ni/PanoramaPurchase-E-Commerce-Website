const sql = require("./sql");

// Product class that helps handle data within product table

module.exports = class Comment {
  /**
   * Retrieve all records in the product table
   * @param {databaseCallback} callback 
   */
  static getByProductId(product_id, callback) {
    const query = "SELECT * FROM Comment NATURAL JOIN (SELECT user_id, user_name FROM User) as T WHERE product_id = ?;";
    const insert = [product_id];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    })
  }
  static getByUserId(user_id, callback) {
    const query = "SELECT * FROM Comment WHERE user_id = ?;";
    const insert = [user_id];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    })
  }
  static deleteById(comment_id, callback) {
    const query = "DELETE FROM Comment WHERE comment_id = ?;";
    const insert = [comment_id];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    });
  }
  static insert(rating, updateTime, content, userId, productId, callback) {
    const maxIdQuery = "SELECT MAX(comment_id) AS comment_id FROM Comment;";
    const insertQuery = "INSERT INTO Comment VALUES(?, ?, ?, ?, ?, ?);";
    sql.execute(maxIdQuery, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      }
      const newId = results[0].comment_id + 1;
      const insert = [newId, rating, updateTime, content, userId, productId];
      sql.execute(insertQuery, insert, (err, results) => {
        if (err) {
          console.error(err);
          return callback(err, results);
        }
        Comment.getByProductId(productId, callback);
      });
    });
  }
  static updateById(comment_id, content, rating, updateTime, callback) {
    const query = "UPDATE Comment SET content = ?, rating = ?, updated_time=? WHERE comment_id = ?;";
    const insert = [content, rating, updateTime, comment_id];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    });
  }
}

/**
 * Callback to handle database results
 * @callback databaseCallback
 * @param {Error} err - error if the database call failed
 * @param {Product[]} results - array of results from the requested query
 */
