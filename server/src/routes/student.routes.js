import express from "express";
import { getAllStudents, getStudentById, logout, updateStudentProfile } from "../controller/student.controller.js";
import { verifyToken } from "../middleware/authenticate.js";
import { uploadProfileImage } from "../middleware/uploadImage.js";

const router = express.Router();

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/logout', verifyToken, logout)
router.put('/update-profile', verifyToken, uploadProfileImage, updateStudentProfile)

export default router;