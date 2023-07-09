USE project;
CREATE TABLE User (
  user_id INT NOT NULL PRIMARY KEY,
  profile TEXT NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  password TEXT NOT NULL
);
CREATE TABLE Admin (
  admin_id INT NOT NULL REFERENCES User(user_id),
  PRIMARY KEY(admin_id)
);
CREATE TABLE Category (
  category_id INT NOT NULL PRIMARY KEY,
  category_name VARCHAR(30) NOT NULL
);
CREATE TABLE Product (
  product_id INT NOT NULL PRIMARY KEY,
  description TEXT NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  product_rating DECIMAL(2, 1) NOT NULL,
  picture_source TEXT NOT NULL,
  product_name TEXT NOT NULL
);
CREATE TABLE CategoryProduct (
  product_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);
CREATE TABLE Comment (
  comment_id INT NOT NULL PRIMARY KEY,
  rating INT NOT NULL,
  updated_time TIMESTAMP NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
  -- each user can only comment the product once
  UNIQUE KEY(user_id, product_id),
  CHECK (
    rating >= 0
    AND rating <= 5
  )
);
CREATE TABLE ShoppingCart (
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, product_id),
  CHECK (
    quantity >= 0
  )
);