import { body } from "express-validator";

const signupValidator = [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Must be a valid email."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export { signupValidator };
