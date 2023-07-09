/* Running from sample data */
/* Delete Product by product_id and delete cascade its comment*/
SELECT * FROM Product WHERE product_id = 100;
SELECT * FROM Comment WHERE product_id = 100;
DELETE FROM Product WHERE product_id = 100;
SELECT * FROM Product WHERE product_id = 100;
SELECT * FROM Comment WHERE product_id = 100;
/* Delete Comment by comment_id */
SELECT * FROM Comment;
DELETE FROM Comment WHERE comment_id = 102;
SELECT * FROM Comment;