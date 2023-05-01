errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).send({
    success: false,
    message: message,
  });
};

successResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).send({
    success: true,
    message: message,
    data: data,
  });
};

module.exports = { errorResponse, successResponse };
