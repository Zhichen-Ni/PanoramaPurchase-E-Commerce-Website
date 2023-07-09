const express = require('express');
const ProductController = require("./controllers/ProductController");
const CommentController = require("./controllers/CommentController");
const CategoryController = require("./controllers/CategoryController");
const UserController = require("./controllers/UserController");
const CartController = require("./controllers/ShoppingCartController");

const router = express.Router();

router.get("/products", ProductController.getAllProduct);
router.get("/product/:product_id", ProductController.getProductById);
router.delete("/product/:product_id", ProductController.deleteProductById);

router.get("/product/:product_id/comments", CommentController.getByProductId);

router.get("/user/:user_id/comments", CommentController.getByUserId);
router.post("/comment/:comment_id", CommentController.editComment);
router.delete("/comment/:comment_id", CommentController.deleteById);;
router.post("/comment", CommentController.addComment);

router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);

router.get("/user/:user_id/cart", CartController.getCartByUser);
router.get("/user/:user_id/cart/product/:product_id", CartController.getCartItem);
router.post("/user/:user_id/cart/product/:product_id", CartController.addToCart);
router.put("/user/:user_id/cart/product/:product_id", CartController.updateCart);
router.delete("/user/:user_id/cart/product/:product_id", CartController.deleteFromCart);

router.get("/categories", CategoryController.getAllCategory);

module.exports = router;