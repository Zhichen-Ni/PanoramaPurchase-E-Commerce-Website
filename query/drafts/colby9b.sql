-- for testing purposes only
-- show databases;
-- use products;
-- show tables;

-- create the following tables for testing purpose only
-- create table User
-- (user_id decimal (4,0) not null primary key,
-- name varchar(30));

-- CREATE TABLE Product(product_id DECIMAL(4, 0) NOT NULL PRIMARY KEY, description TEXT NOT NULL,  
-- price DECIMAL(5, 2), rating DECIMAL(2, 0), picture_source VARCHAR(100) NOT NULL, product_name VARCHAR(100), 
-- check (rating >= 0 and rating <= 5 and price >= 0));
  
-- nsert into User values (1, "Tim Tom");

-- insert into User values (2, "Sara Sara");

-- insert into User values (3, "Colby colby");

-- insert into Product values (1, "apple", 2.0, 0.0, "...", "apple");

-- insert into Product values (2, "pear", 3.0, 0.0, "...", "pear");

-- insert into Product values (3, "cucumber", 4.0, 0.0, "...", "cucumber");

-- create table Comment
-- (comment_id decimal (4,0) not null primary key,
-- rating int signed,
-- updated timestamp,
-- content text not null,
-- product_id decimal (4,0) not null,
-- user_id decimal (4,0) not null,
-- foreign key (user_id) references user(user_id) on delete cascade,
-- foreign key (product_id) references product(product_id) on delete cascade,
-- unique key(user_id, product_id), -- each user can only comment the product once
-- check (rating>= 0 and rating <= 5));

-- insert into Comment values
-- (1, 0.0, '2020-10-14 10:20:00', "very good", 1, 1);

-- insert into Comment values
-- (2, 0.0, "2021-10-11 10:10:10", "I love it", 1, 2);


-- trigger to update the rating of a product when a new comment is inserted
-- formula to calculate new rating after insert
-- (old avg rating * (# ratings - 1) + new customer rating) / (# ratings)
delimiter $$
create trigger update_product_rating_on_insert
after insert on Comment
for each row
begin
    set @var := (((select rating from product where product_id = new.product_id)
        *
        ((select count(*) from Comment where product_id = new.product_id) - 1)
        + new.rating)
        /
        (select count(*) from Comment where product_id = new.product_id));
	if (new.rating > 0) then
		update product
		set rating = round(@var, 1)
        where product_id = new.product_id;
	end if;
end $$
delimiter ;

-- trigger to update the rating of a product when a comment is removed
-- formula to calculate new rating after insert
-- (old avg rating * (# ratings + 1) - old customer rating) / (# ratings)
delimiter $$
create trigger update_product_rating_on_delete
after delete on Comment
for each row
begin
    set @var := (((select rating from product where product_id = old.product_id)
        *
        ((select count(*) from Comment where product_id = old.product_id) + 1)
        - old.rating)
        /
        (select count(*) from Comment where product_id = old.product_id));
	if (old.rating > 0) then
		update product
		set rating = round(@var, 1)
        where product_id = old.product_id;
	end if;
end $$
delimiter ;

-- trigger to update the rating of a product when a comment is updated
-- formula to calculate new rating after insert
-- (old avg rating * # ratings + (new customer rating - old avg rating)) 
-- / (# ratings)
delimiter $$
create trigger update_product_rating_on_update
after update on Comment
for each row
begin
	set @var := ((((select rating from product where product_id = new.product_id)
        *
        (select count(*) from Comment where product_id = new.product_id))
        + 
        (new.rating - old.rating))
        /
        (select count(*) from Comment where product_id = new.product_id));
	if (OLD.rating <> new.rating) then
		update product
		set rating = round(@var, 1)
        where product_id = new.product_id;
	end if;
end $$
delimiter ;

-- get avreate rating by product id (Version 1): fetch directly from product
select rating from product where product_id = 1;

-- get average rating by product id (Version 2): physically calculates the average
(select (round(((select sum(rating) from Comment where product_id = 1)
				/
				(select count(*) from Comment where product_id = 1)), 1)));

-- remove product rating by product id (set rating to 0)
update Product
set rating = 0
where product_id = 1;

-- now to test the trigger
-- insert into Comment values
-- (3, 4.0, '2020-10-14 10:20:01', "very good", 3, 3);

-- select rating from product where product_id = 3;

-- test the second trigger
-- update Comment
-- set rating = 0
-- where product_id = 3;

-- select rating from product where product_id = 3;


