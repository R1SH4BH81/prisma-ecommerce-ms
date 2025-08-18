const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart.controllers");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, addToCart);
router.get("/", authenticate, getCart);
router.put("/:itemId", authenticate, updateCartItem);
router.delete("/:itemId", authenticate, removeCartItem);

module.exports = router;
