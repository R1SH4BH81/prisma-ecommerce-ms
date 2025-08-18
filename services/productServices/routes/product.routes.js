const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controllers");

const { authenticate, isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/", getAllProduct);
router.get("/:id", getProductById);

router.post("/", authenticate, isAdmin, createProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);

module.exports = router;
