-- create indexes

-- R6:
-- Since the queries for this feature outputs information on every tuple in the Product and Category table, 
-- having indexes does not speed up these queries.

-- R7:
create index user_id_idx on comment(user_id);
create index product_id_idx on comment(product_id);
create index price_idx on product(price);
create index rating_idx on product(product_rating);
create index category_id_idx on CategoryProduct(category_id);

-- R8: 
create index product_id_idx2 on product(product_id);
create index comment_id_idx on comment(comment_id);

-- R9:
-- N/A, since we already created indexes for product(product_id) for feature R8

-- R10:
create index user_id_product_id_idx on shoppingCart(user_id, product_id);
create index quantity_idx on shoppingCart(quantity);

-- R11:
-- Cannot create an index on product(product_name), since product_name field is a text, and MySQL produces the following error: 
-- “Error Code: 1170. BLOB/TEXT column 'product_name' used in key specification without a key length”
