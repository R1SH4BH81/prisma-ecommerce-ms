const express = require("express");
const {
  processPayment,
  getPaymentByOrder,
} = require("../controllers/payment.controllers");

const router = express.Router();

router.post("/", processPayment);
router.get("/:orderId", getPaymentByOrder);

module.exports = router;
