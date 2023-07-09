const sql = require("./sql");

// Product class that helps handle data within product table

module.exports = class Category {
  /**
   * Retrieve all records in the product table
   * @param {databaseCallback} callback 
   */
  static getByUserId(uid, callback) {
    const query = "SELECT * FROM ShoppingCart NATURAL JOIN Product WHERE user_id = ? ;";
    const insert = [uid];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err); 
      callback(err, results);
    });
  }
  static getById(uid, pid, callback) {
    const query = "SELECT * FROM ShoppingCart WHERE user_id = ? AND product_id = ?;";
    const insert = [uid, pid];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err); 
      callback(err, results);
    });
  }
  static insert(uid, pid, callback) {
    const query = "INSERT INTO ShoppingCart VALUES(?, ?, ?);";
    const insert = [uid, pid, 1];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err); 
      callback(err, results);
    });
  }
  static delete(uid, pid, callback) {
    const query = "DELETE FROM ShoppingCart WHERE user_id = ? AND product_id = ?;";
    const insert = [uid, pid];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err); 
      callback(err, results);
    });
  }
  static updateById(uid, pid, quantity, callback) {
    const query = "UPDATE ShoppingCart SET quantity = ? WHERE user_id = ? AND product_id = ?;";
    const insert = [quantity, uid, pid];
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
 * @param {Category[]} results - array of results from the requested query
 */
