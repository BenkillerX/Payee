import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("username is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];