const multer = require("multer");
const { errorMessages } = require("../utils/uploadUtils");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        status: "error",
        message: errorMessages[error.code]?.(error) || error.message,
      });
    }
    next();
  });
};
