const mysql = require("mysql2");
require("dotenv").config();
// Create a SQL connection
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database:  process.env.DATABASE_NAME
});
// Check if the connection is successful
connection.connect(error => {
  if (error) throw error;
  console.log("Connected to MySQL server");
});
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback databaseCallback
 * @param {Error} err - error if the database call failed
 * @param {Array} results - array of results from the requested query
 */

module.exports = connection;