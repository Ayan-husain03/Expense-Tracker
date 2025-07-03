const asyncHandler = (fn) =>
  async function (req, res, next) {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { asyncHandler };
