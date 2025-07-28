const express = require("express");
const uploadMiddleware = require("../middlewares/upload");
const verifyToken = require("../middlewares/auth");
const uploadFile = require("../controller/upload.controller");

const router = express.Router();

router.post("/upload", verifyToken, uploadMiddleware, uploadFile);

module.exports = router;
