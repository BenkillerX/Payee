import { body } from "express-validator"

export const userProfileValidation = ()=>{
    body("username")
    .optional()
    .notEmpty()
    .isLength({min:3, max:30})
    .withMessage("Username Must Be betweem 3 and 30")


    body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Provide an email")
}