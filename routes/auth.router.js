const express = require("express");
const {
  register,
  login,
  verifyEmail,
} = require("../controller/auth.controller");

const router = express.Router();

router.get("/verify-email", verifyEmail);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
