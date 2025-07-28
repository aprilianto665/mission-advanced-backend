const sendResponse = (res, status, success, message, data = {}) => {
  res
    .status(status)
    .json({ status: success ? "success" : "error", message, ...data });
};

const handleError = (res, error) =>
  sendResponse(res, 500, false, error.message);

module.exports = { sendResponse, handleError };
