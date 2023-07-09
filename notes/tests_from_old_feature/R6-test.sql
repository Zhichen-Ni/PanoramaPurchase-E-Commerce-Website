-- 1. Insert an user
insert into User values (1, "", "Daniel Ni", "cs348 is a great class");
select * from User;

-- 2. Insert an admin
insert into Admin values(1);
select * from Admin;

-- 3. Update user information
update User 
set	profile = 'update',
user_name = 'update',
password = 'update'
where user_id = 1;
select * from User;

-- 4. Update admin information
update User
set	profile = 'update',
user_name = 'update',
password = 'update'
where user_id = (select admin_id
               from  Admin
                where admin_id = 1);
select * from User;
select * from Admin;

-- 5. Get a user by user_id
SELECT *
  FROM User
  WHERE user_id = 1;

-- 6. Get user profile url
SELECT profile
  FROM User
  WHERE user_id = 1;
