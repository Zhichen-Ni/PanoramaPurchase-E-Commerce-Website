/* Running from sample data */
/* 1. Test UPDATE_product_rating_ON_INSERT trigger */
SELECT * FROM comment WHERE product_id=100;
SELECT * FROM product WHERE product_id=100;
INSERT INTO Comment VALUES(200, 5, now(), "First time, nice", 1, 100);
SELECT * FROM product WHERE product_id=100;

/* 2. Test UPDATE_product_rating_ON_DELETE trigger */
SELECT * FROM comment WHERE product_id=100;
SELECT * FROM product WHERE product_id=100;
DELETE FROM Comment WHERE comment_id = 200;
SELECT * FROM product WHERE product_id=100;

/* 3. Test UPDATE_product_rating_ON_UPDATE trigger */
SELECT * FROM comment WHERE product_id=100;
SELECT * FROM product WHERE product_id=100;
UPDATE Comment SET rating=0 WHERE comment_id=106;
SELECT * FROM product WHERE product_id=100;

/* 4. Test get product rating by id */
SELECT product_rating FROM Product WHERE product_id=100;
