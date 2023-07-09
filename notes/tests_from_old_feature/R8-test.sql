-- 1. Insert comments
insert into Comment values
(201, 3.5, '2020-10-14 10:20:00', "very good", 100, 308);
insert into Comment values
(202, 4.5, "2021-10-11 10:10:10", "I love it", 200, 308);
select * from Comment;

-- 2. Update a comment
update Comment set
	content = 'update',
    updated_time = now()
    where comment_id = 201;
select * from Comment;

-- 3. Remove a comment
delete from Comment
  where comment_id = 202;
select * from Comment;

-- 4. Get all comments by product_id
select * from Comment where product_id = 100;
