import express from "express";
import { validateRegister } from "../middleware/validateRegister.js";
import { register, login, verifyEmail, resetPassword, requestResetPassword } from "../controller/student.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";

const router = express.Router();

router.post('/register', validateRegister, register)
router.get('/verify/:token', verifyEmail)
router.post('/login', validateLogin, login)
router.post('/request-password-reset', requestResetPassword),
router.post('/reset-password', resetPassword)

export default router;