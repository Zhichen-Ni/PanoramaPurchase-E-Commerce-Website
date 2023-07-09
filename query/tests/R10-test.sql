/* 1. Test the feature of setting quantity to 0 and subsequently remove the tuple from ShoppingCart */
Update ShoppingCart 
SET quantity = 0
WHERE user_id = 300 AND product_id = 102;

DELETE FROM ShoppingCart WHERE quantity = 0;

Select * from ShoppingCart;