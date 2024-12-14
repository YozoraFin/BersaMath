import { check, validationResult } from "express-validator";

export const validateLogin = [
  check("identifier")
    .notEmpty()
    .withMessage("Email atau nomor telepon diperlukan"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
