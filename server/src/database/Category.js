const sql = require("./sql");

// Product class that helps handle data within product table

module.exports = class Category {
  /**
   * Retrieve all records in the product table
   * @param {databaseCallback} callback 
   */
  static getAll(callback) {
    const query = "SELECT * FROM Category;";
    const insert = [];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err); 
      callback(err, results);
    })
  }
}

/**
 * Callback to handle database results
 * @callback databaseCallback
 * @param {Error} err - error if the database call failed
 * @param {Category[]} results - array of results from the requested query
 */
