import { validationResult } from "express-validator";

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    })),
  });
}

export { handleValidationErrors };
