const sendResponse = (res, status, success, message, data = null) => {
  res.status(status).json({
    status: success ? "success" : "error",
    message,
    ...(data && { data }),
  });
};

const errorMessages = {
  UNEXPECTED_FIELD: (error) =>
    `Expected field name: 'file', received: '${error.field}'`,
  LIMIT_FILE_SIZE: () => "File size exceeds 5MB limit",
};

module.exports = { sendResponse, errorMessages };
