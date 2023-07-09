-- Create User table
CREATE TABLE User (
  user_id INT NOT NULL PRIMARY KEY,
  profile TEXT NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  password TEXT NOT NULL
);
 

-- Create Admin Table
CREATE TABLE Admin (
  admin_id INT NOT NULL REFERENCES User(user_id),
  PRIMARY KEY(admin_id)
);

-- Insert an user
insert into User values
(1, "https://media-exp1.licdn.com/dms/image/", "Daniel Ni", "cs348 is a great class");

-- Insert an admin
insert into Admin values
(1);

-- Update user information
update User 
set	profile = 'updated_profile',
user_name = 'updated_user_name',
password = 'updated_password'
where user_id = 1;

-- Update admin information
update User
set	profile = 'updated_profile',
user_name = 'updated_user_name',
password = 'updated_password'
where user_id = (select admin_id
               from  Admin
                where admin_id = 1);


-- Get a user by user_id
SELECT *
  FROM User
  WHERE user_id = 1;

-- Get user profile URL
SELECT profile
  FROM User
  WHERE user_id = 1;
