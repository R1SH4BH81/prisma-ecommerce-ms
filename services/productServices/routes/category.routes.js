const express = require("express");
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/product.controllers"); // still using same controller for now

const { authenticate, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", authenticate, isAdmin, createCategory);
router.put("/:id", authenticate, isAdmin, updateCategory);
router.delete("/:id", authenticate, isAdmin, deleteCategory);

module.exports = router;
