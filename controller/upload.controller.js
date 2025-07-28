const { sendResponse } = require("../utils/uploadUtils");

const uploadFile = (req, res) => {
  if (!req.file) {
    return sendResponse(res, 400, false, "No file uploaded");
  }
  sendResponse(res, 200, true, "File uploaded successfully", req.file);
};

module.exports = uploadFile;
