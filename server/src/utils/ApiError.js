class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    success = false,
    data = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
