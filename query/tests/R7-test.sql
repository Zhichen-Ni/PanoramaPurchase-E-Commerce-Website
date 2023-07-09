/* Running from sample data */
/* 1. Filter Comment by user_id */
SELECT * FROM Comment WHERE 
  user_id = 100 OR user_id = 200;
/* 2. Filter Comment by product_id */
SELECT * FROM Comment WHERE
  (product_id >= 100 AND product_id < 200) OR
  (product_id >= 300 AND product_id < 400);
/* 3. Filter Products of a specific price range */
SELECT * FROM Product WHERE
  (price >= 15 AND price <= 20);
/* 4. Filter Products of a specific rating range */
SELECT * FROM Product WHERE
  (product_rating >= 1 AND product_rating <= 3);
/* 5. Sort Products by price or rating (both ascending and descending) */
SELECT * FROM Product ORDER BY product_rating ASC;
SELECT * FROM Product ORDER BY product_rating DESC;
SELECT * FROM Product ORDER BY price ASC;
SELECT * FROM Product ORDER BY price DESC;

-- Sort all products in the selected category/categories by price:
select * from product where
product_id in (select product_id from CategoryProduct where category_id = 100) order by price asc;
select * from product where
product_id in (select product_id from CategoryProduct where category_id = 300 or category_id = 500) order by price desc;

-- Sort all products in the selected category/categories by rating
select * from product where
product_id in (select product_id from CategoryProduct where category_id = 100) order by product_rating asc;
select * from product where
product_id in (select product_id from CategoryProduct where category_id = 300 or category_id = 500) order by product_rating desc;

-- Sort all products in the selected price range(s) by rating
select * from product where
product_id in (select product_id from CategoryProduct where (price >= 0 and price <= 20)) order by product_rating asc;
select * from product where
product_id in (select product_id from CategoryProduct where (price >= 0 and price <= 15)) order by product_rating desc;

-- Return all products in the selected category/categories in the selected price range(s)
select * from product where
product_id in (select product_id from CategoryProduct where (price >= 0 and price <= 20 and category_id = 500)) 
order by product_rating asc;

select * from product where
product_id in (select product_id from CategoryProduct where (price >= 0 and price <= 100
and (category_id = 300 or category_id = 500))) order by product_rating asc;