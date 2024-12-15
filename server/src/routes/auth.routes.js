import express from "express";
import { handleRefreshToken } from "../middleware/authenticate.js";
import { validateRegister } from "../middleware/validateRegister.js";
import { registerSuperTeacher, teacherLogin, teacherRegister, teacherRequestResetPassword, teacherResetPassword, teacherVerifyEmail } from "../controller/teacher.controller.js";
import { validateLogin } from "../middleware/validateLogin.js";
import { studentLogin, studentRegister, studentRequestResetPassword, studentResetPassword, studentVerifyEmail } from "../controller/student.controller.js";

const router = express.Router();

router.post('/refresh-token', handleRefreshToken)

// teacher routes
router.post('/teacher/register', validateRegister, teacherRegister)
router.post('/register-superteacher', validateRegister, registerSuperTeacher)
router.get('/teacher/verify/:token', teacherVerifyEmail)
router.post('/teacher/login', validateLogin, teacherLogin)
router.post('/teacher/request-password-reset', teacherRequestResetPassword),
router.post('/teacher/reset-password', teacherResetPassword)

// student routes
router.post('/student/register', validateRegister, studentRegister)
router.get('/student/verify/:token', studentVerifyEmail)
router.post('/student/login', validateLogin, studentLogin)
router.post('/student/request-password-reset', studentRequestResetPassword),
router.post('/student/reset-password', studentResetPassword)

export default router;