import express from "express";
import { getAllTeachers, getTeacherById, logout, updateTeacherProfile } from "../controller/teacher.controller.js";
import { verifyToken } from "../middleware/authenticate.js";
import { uploadProfileImage } from "../middleware/uploadImage.js";

const router = express.Router();

router.get('/', getAllTeachers)
router.get('/:id', getTeacherById)
router.post('/logout', verifyToken, logout)
router.put('/update-profile', verifyToken, uploadProfileImage, updateTeacherProfile)

export default router;