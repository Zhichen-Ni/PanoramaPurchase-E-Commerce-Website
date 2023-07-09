
CREATE TABLE product(product_id DECIMAL(6, 0) NOT NULL PRIMARY KEY, 
description TEXT NOT NULL,  
price DECIMAL(6, 2) NOT NULL, 
rating DECIMAL(2, 1) NOT NULL, 
picture_source TEXT NOT NULL, 
product_name TEXT NOT NULL, 
check (rating >= 0 and rating <= 5 and price >= 0));

select * from product;

/* create Category and CategoryProduct tables */
CREATE TABLE Category(category_id INT NOT NULL PRIMARY KEY, category_name VARCHAR(30));

/*DROP TABLE CategoryProduct;*/
CREATE TABLE CategoryProduct(product_id DECIMAL(6, 0) NOT NULL PRIMARY KEY, category_id INT);

/* list products with their category */
SELECT * FROM Category;
SELECT * FROM CategoryProduct;

INSERT INTO product VALUES(1, "Product of Dole Cherry Mixed Fruit Cups, 16 pk./4 oz. Canned Fruit", 19.72, 4, 
"https://www.walmart.com/ip/Product-of-Dole-Cherry-Mixed-Fruit-Cups-16-pk-4-oz/967194682", 
"Product of Dole Cherry Mixed Fruit Cups 16 pk./4 oz.");

INSERT INTO product VALUES(2, "FRESHNESS GUARANTEED. You want the freshest for your family and so do we. We've trained our 
Associates to pick the best and freshest products to meet your expectations. Satisfaction guaranteed or your money back!", 3.90, 4, 
"https://i5.walmartimages.ca/images/Enlarge/398/991/6000202398991.jpg", "Apple Royal Gala Your Fresh Market");

INSERT INTO product VALUES(3, "HEALTH BENEFITS: Apples are a source of fiber. *Based on ~1 small apple (140g)", 0.99, 4.6, 
"https://i5.walmartimages.ca/images/Enlarge/_41/393/41393.jpg", "Apple Granny Smith");

INSERT INTO product VALUES(4, "Triple the play with the Little Tikes 3-in-1 Sports Zone! Dunk kick and score with your child’s 3 favorite sports: basketball soccer and bowling! Basketball 
features an adjustable height hoop to grow with your child. ", 69.97, 5, 
"https://i5.walmartimages.ca/images/Enlarge/277/196/6000199277196.jpg", 
"Little Tikes 3-in-1 Sports Zone");

INSERT INTO product VALUES(5, "Colorful cotton-filled soccer ball for indoor outdoor toys.
Safe and plush, filled with high quality PP cotton.", 11.19, 4, 
"http://t3.gstatic.com/images?q=tbn:ANd9GcSL1i6Gwvy0RjqQY3jBI4Q5uBv1r-PUSMAc9Z82_e-28UVknerg", 
"Soft Soccer Ball Football Sport Indoor 11.5cm");

select * from product;

INSERT INTO Category VALUES(1, "Fruits");
INSERT INTO Category VALUES(2, "Skin Care");
INSERT INTO Category VALUES(3, "Vegetables");
INSERT INTO Category VALUES(4, "Sports");
INSERT INTO Category VALUES(5, "Baby");

INSERT INTO CategoryProduct VALUE(1, 1);
INSERT INTO CategoryProduct VALUE(2, 1);
INSERT INTO CategoryProduct VALUE(3, 1);
INSERT INTO CategoryProduct VALUE(4, 4);
INSERT INTO CategoryProduct VALUE(4, 5);
INSERT INTO CategoryProduct VALUE(5, 4);
INSERT INTO CategoryProduct VALUE(5, 5);

SELECT * FROM Category;
SELECT * FROM CategoryProduct;

/* Lookup a product by its product_id */
SELECT * FROM product where product_id = 1;

/* Return all products that belong to a specific selected category/multiple selected categories */
SELECT * FROM Product
WHERE product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 1);

SELECT * FROM Product
WHERE product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 4 or category_id = 5);

/* Return all products that belong to a specific price range */
SELECT * FROM product where (price >= 15 and price <= 20);

/* Return all products that belong to a specific rating range */
SELECT * FROM product where (rating >= 4 and rating <= 5);

/* Sort products by price or ratings (both ascending and descending) */
SELECT * FROM product ORDER BY rating ASC;
SELECT * FROM product ORDER BY rating DESC;
SELECT * FROM product ORDER BY price ASC;
SELECT * FROM product ORDER BY price DESC;

/* Sort all products in the selected category/categories by price */
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 1) ORDER BY price ASC;
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 4 or category_id = 5) ORDER BY price DESC;

/* Sort all products in the selected category/categories by rating */
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 1) ORDER BY rating ASC;
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE category_id = 4 or category_id = 5) ORDER BY rating DESC;

/* Sort all products in the selected price range(s) by rating */
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE (price >= 0 and price <= 20)) ORDER BY rating ASC;
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE (price >= 0 and price <= 15)) ORDER BY rating DESC;

/*Return all products in the selected category/categories in the selected price range(s), 
sorted by rating (both asc/desc) */
SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE (price >= 0 and price <= 20 and category_id = 1)) 
ORDER BY rating ASC;

SELECT * FROM product WHERE
product_id in (SELECT product_id FROM CategoryProduct WHERE (price >= 0 and price <= 100 and 
(category_id = 4 or category_id = 5))) ORDER BY rating DESC;
