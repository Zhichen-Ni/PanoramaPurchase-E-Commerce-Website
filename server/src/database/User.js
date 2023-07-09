const sql = require("./sql");

// Product class that helps handle data within product table

module.exports = class User {
  /**
   * Retrieve all records in the product table
   * @param {databaseCallback} callback 
   */
  static getUserByName(username, callback) {
    const query = "SELECT * FROM User  LEFT JOIN Admin ON user_id=admin_id WHERE user_name = ?";
    const insert = [username];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    });
  }
  static getById(userid, callback) {
    const query = "SELECT * FROM User LEFT JOIN Admin ON user_id=admin_id WHERE user_id=?;";
    const insert = [userid];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    });
  }
  static makeAdmin(userid, callback) {
    const query = "INSERT INTO Admin VALUES(?);";
    const insert = [userid];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    });

  }
  static insertUser(username, password, profile, isAdmin, callback) {
    const maxIdQuery = "SELECT MAX(user_id) AS user_id FROM User;";
    const insertQuery = "INSERT INTO User VALUES(?, ?, ?, ?);";
    sql.execute(maxIdQuery, (err, results) => {
      if (err) {
        console.error(err);
        callback(err, null);
      }
      const newId = results[0].user_id + 1;
      const insert = [newId, profile, username, password];
      sql.execute(insertQuery, insert, (err, results) => {
        if (err) {
          console.error(err);
          return callback(err, results);
        }
        if (isAdmin) {
          return User.makeAdmin(newId, (err, cb) => {
            if (err) {
              console.error(err);
              return callback(err, results);
            }
            User.getById(newId, callback);
          });
        }
        User.getById(newId, callback);
      });
    });

  }
}

/**
 * Callback to handle database results
 * @callback databaseCallback
 * @param {Error} err - error if the database call failed
 * @param {User} results - array of results from the requested query
 */
