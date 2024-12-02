import express from "express";
import { validateRegister } from "../middleware/validateRegister.js";
import { hashPassword } from "../middleware/password.js";
import { register, login, verifyEmail } from "../controller/teacher.controller.js";

const router = express.Router();

router.post('/register', validateRegister, hashPassword, register)
router.get('/verify/:token', verifyEmail)
router.post('/login', login)

export default router;