import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controller/course.controller.js";
import { verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js";
import { uploadThumbnail } from "../middleware/uploadImage.js";

const router = express.Router();

// Public routes
router.get('/', getAllCourses)
router.get('/:course_id',verifyToken, getCourseById)

// Protected routes
router.post('/create', verifyToken, verifyTeacher, uploadThumbnail, createCourse)
router.put('/update/:course_id', verifyToken, verifyTeacher, verifyCourseOwner, uploadThumbnail, updateCourse)
router.delete('/delete/:course_id', verifyToken, verifyTeacher, verifyCourseOwner, deleteCourse)

export default router;