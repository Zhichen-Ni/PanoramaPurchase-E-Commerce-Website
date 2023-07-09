USE project;
-- Import sample data into the tables, please read through the comment below for instructions
-- Run the query below, check the output
SHOW VARIABLES LIKE "secure_file_priv";
/* If you have NULL, use Method 1; else, use Method 2
   both assumes you are working in MySQL Workbench) */
/* Method 1:
   Add the following to Connection > Advanced > Other
     accessed via right-click on wrench button on Workbench start page and select corresponding connection */
-- OPT_LOCAL_INFILE=1
/* Close current connection, open a new one
   Execute the following query */
-- SET GLOBAL local_infile = "ON";
-- SHOW VARIABLES LIKE "local_infile";
/* You should see `local_infile` as `ON`
   Find the aboslute path to the correponding sample files, replace the path in the LOAD DATA queries
   Modify the query to `LOAD DATA LOCAL INFILE` */
/* Method 2
   Locate the folder indicated by secure_file_priv
   Copy the datafile in /sample into the folder
   Update the path of LOAD DATA queries to the folder path
   Replace "/"" instead of "\"" in the path */
-- Load User/Admin
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/User.txt" INTO TABLE User;
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Admin.txt" INTO TABLE Admin;
-- Load Category
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Category.txt" INTO TABLE Category;
-- Load Product
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Shirley_Fruit.txt" INTO TABLE Product;
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Sara_BabyProduct.txt" INTO TABLE Product;
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Colby_Vegetable.txt" INTO TABLE Product;
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Daniel_Drink.txt" INTO TABLE Product;
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Peter_Skincare.txt" INTO TABLE Product;
-- Reset rating
UPDATE Product SET product_rating = 0 WHERE product_id > 0;
-- Load CategoryProduct
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/CategoryProduct.txt" INTO TABLE CategoryProduct;
-- Load Comment
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/Comment.txt" INTO TABLE Comment;
-- Load Shopping Cart
LOAD DATA /*LOCAL*/ INFILE "REPLACE_YOUR_PATH/ShoppingCart.txt" INTO TABLE ShoppingCart;