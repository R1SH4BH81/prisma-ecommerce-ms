const express = require("express");
const {
  registerUser,
  getUsers,
  loginUser,
} = require("../controllers/users.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authenticate, getUsers);

module.exports = router;
