import { check, validationResult } from "express-validator";

export const validateRegister = [
  check("name").notEmpty().withMessage("Nama diperlukan"),
  check("email").isEmail().withMessage("Diperlukan email yang valid"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Kata sandi minimal harus terdiri dari 8 karakter"),
  check("gender")
    .isIn(["Pria", "Wanita"])
    .withMessage("Jenis kelamin harus 'Pria' atau 'Wanita'"),
    check("phone")
    .notEmpty()
    .withMessage("Nomor telepon diperlukan")
    .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)
    .withMessage("Masukkan nomor telepon Indonesia yang valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
