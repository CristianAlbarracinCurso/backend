function errorHandler(err, req, res, next) {
  const { statusCode, message } = err;
  console.log(err);
  return res
    .status(statusCode || 500)
    .json({ message: message || "Internal Server Error" });
}

export default errorHandler;
