USE project;
-- trigger to UPDATE the rating of a product when a new comment is inserted
-- formula to calculate new rating AFTER insert
-- (old avg rating * (# ratings - 1) + new customer rating) / (# ratings)
delimiter $$
CREATE TRIGGER UPDATE_product_rating_ON_INSERT
AFTER INSERT ON Comment
FOR EACH ROW
BEGIN
  SET @new_total := (SELECT count(*) FROM Comment WHERE product_id = new.product_id);
  SET @old_rating := (SELECT product_rating FROM product WHERE product_id = new.product_id);
  SET @new_rating := (
    (@old_rating * (@new_total - 1) + new.rating) / @new_total
  );
  UPDATE product
  SET product_rating = ROUND(@new_rating, 1)
  WHERE product_id = new.product_id;
END $$
delimiter ;

-- trigger to UPDATE the rating of a product when a comment is removed
-- formula to calculate new rating AFTER insert
-- (old avg rating * (# ratings + 1) - old customer rating) / (# ratings)
delimiter $$
CREATE TRIGGER UPDATE_product_rating_ON_DELETE
AFTER DELETE ON Comment
FOR EACH ROW
BEGIN
  SET @new_total := (SELECT count(*) FROM Comment WHERE product_id = old.product_id);
  IF (@new_total = 0) THEN
    UPDATE product
    SET product_rating = 0.0
    WHERE product_id = old.product_id;
  ELSE 
    SET @old_rating := (SELECT product_rating FROM product WHERE product_id = old.product_id);
    SET @new_rating := (
      (@old_rating * (@new_total + 1) - old.rating) / @new_total
    );
    UPDATE product
    SET product_rating = ROUND(@new_rating, 1)
    WHERE product_id = old.product_id;
	END IF;
END $$
delimiter ;

-- trigger to UPDATE the rating of a product when a comment is UPDATEd
-- formula to calculate new rating AFTER insert
-- (old avg rating * # ratings + (new customer rating - old avg rating)) 
-- / (# ratings)
delimiter $$
CREATE TRIGGER UPDATE_product_rating_ON_UPDATE
AFTER UPDATE ON Comment
FOR EACH ROW
BEGIN
	IF (OLD.rating <> new.rating) THEN
    SET @new_total := (SELECT count(*) FROM Comment WHERE product_id = new.product_id);
    SET @old_rating := (SELECT product_rating FROM product WHERE product_id = new.product_id);
    SET @new_rating := (
      (@old_rating * @new_total - old.rating + new.rating) / @new_total
    );
    UPDATE product
    SET product_rating = ROUND(@new_rating, 1)
    WHERE product_id = new.product_id;
	END IF;
END $$
delimiter ;
