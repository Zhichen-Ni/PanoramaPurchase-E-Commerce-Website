

-- -- testing purposes only for user and product
-- create table User
-- (uid decimal (4,0) not null primary key,
-- name varchar(30));

-- create table product
-- (pid decimal (4,0) not null primary key,
-- description varchar(500));   

-- insert into User values
-- (1, "Tim Tom");

-- insert into User values
-- (2, "Sara Sara");

-- insert into Product values
-- (1, "apple");

-- ----------------------------------


create table Comment
(comment_id decimal (4,0) not null primary key,
rating int signed,
updated_time timestamp,
content text not null,
product_id decimal (4,0) not null,
user_id decimal (4,0) not null,
foreign key (user_id) references user(user_id) on delete cascade,
foreign key (product_id) references product(product_id) on delete cascade,
unique key(user_id, product_id), -- each user can only comment the product once
check (rating>= 0 and rating <= 5));

insert into Comment values
(201, 4, '2020-10-14 10:20:00', "very good", 100, 308);

update Comment set
	content = 'update',
    updated_time = now()
    where comment_id = 201;
    
select * from Comment 
	where product_id = 100;
    