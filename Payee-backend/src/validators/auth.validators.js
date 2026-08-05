import { body } from "express-validator";

export const registerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];