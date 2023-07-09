const sql = require("./sql");
const _ = require("lodash");
const WHERE = "WHERE ";

// Product class that helps handle data within product table
module.exports = class Product {
  /**
   * Retrieve all records in the product table
   * @param {databaseCallback} callback 
   */
  static getAll(options, callback) {
    // Intial query
    let query = "SELECT * FROM product NATURAL JOIN categoryProduct ";
    // Insert query
    let insert = [];
    // Filters
    if (options?.filter) {
      let where = WHERE;
      // Rating
      if (!_.isNil(options.filter.rating)) {
        where += "product_rating >= ? ";
        insert.push(options.filter.rating);
      }
      // Category
      if (!_.isNil(options.filter.category)) {
        let values = "";
        for (let v of options.filter.category) {
          values += `?,`;
          insert.push(v);
        }
        if (values.length > 0) {
          if (where.length !== WHERE.length) where += "AND ";
          values = values.slice(0, values.length - 1);
          where += `category_id in (${values})`;
        }
      }
      // Price
      if (!_.isNil(options.filter.price)) {
        const price = options.filter.price;
        let values = "";
        if (price.from !== null) {
          values += "price >= ? ";
          insert.push(price.from);
        }
        if (price.to !== null) {
          if (values.length !== 0) values += "AND ";
          values += "price <= ? ";
          insert.push(price.to);
        }
        if (price.from !== null || price.to !== null) {
          if (where.length !== WHERE.length) where += "AND ";
          where += values;
        }
      }
      if (!_.isNil(options.filter.search)) {
        if (where.length !== WHERE.length) where += "AND ";
        where += "product_name LIKE ? ";
        insert.push(`%${options.filter.search}%`);
      }
      if (where.length !== WHERE.length) query += where;
    }
    // Sorting options
    if (_.isBoolean(options?.sort?.price)) {
      query += `ORDER BY price ${options.sort.price ? "ASC" : "DESC"}`;
    } else if (_.isBoolean(options?.sort?.rating)) {
      query += `ORDER BY product_rating ${options.sort.rating ? "ASC" : "DESC"}`;
    }
    query += ";"
    console.log(sql.format(query, insert));
    sql.execute(query, insert, (err, results, fields) => {
      if (err) console.error(err);
      console.log(`Selected ${results.length} rows`);
      callback(err, results);
    });
  }
  static getById(product_id, callback) {
    const query = "SELECT * FROM Product WHERE product_id = ?";
    const insert = [product_id];
    sql.execute(query, insert, (err, results) => {
      if (err) console.error(err);
      callback(err, results);
    })
  }
  static deleteById(product_id, callback) {
    const query = "DELETE FROM Product WHERE product_id = ?";
    const insert = [product_id];
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
