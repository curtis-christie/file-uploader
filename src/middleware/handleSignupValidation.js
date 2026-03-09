import { body } from "express-validator";

const signupValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("Must enter email.")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Must enter password")
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be 8 to 128 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Must enter password")
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export default signupValidation;
