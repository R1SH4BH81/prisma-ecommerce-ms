const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controllers");

const { authenticate, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/:id", authenticate, getOrderById);

router.get("/", authenticate, isAdmin, getAllOrders);
router.put("/:id", authenticate, isAdmin, updateOrderStatus);
router.delete("/:id", authenticate, isAdmin, deleteOrder);

module.exports = router;
