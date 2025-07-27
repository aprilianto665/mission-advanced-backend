const express = require("express");
const { register } = require("../controller/auth.controller");

const router = express.Router();

router.get("/verify-email", () => {});
router.post("/register", register);
router.post("/login", () => {});

module.exports = router;
