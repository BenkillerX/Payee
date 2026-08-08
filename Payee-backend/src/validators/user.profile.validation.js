import { body } from "express-validator"

export const userProfileValidation = [
    body("username")
    .optional()
    .notEmpty()
    .isLength({min:3, max:30})
    .withMessage("Username Must Be betweem 3 and 30"),


    body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Provide an email")
]

export const passwordValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 8 })
        .withMessage("New password must be at least 8 characters long")
];