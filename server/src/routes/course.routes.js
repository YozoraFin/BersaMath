import express from "express";
import { addTeachersToCourse, createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controller/course.controller.js";
import { isSuperTeacher, verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js";
import { uploadThumbnail } from "../middleware/uploadImage.js";

const router = express.Router();

// Public routes
router.get('/', getAllCourses)
router.get('/:course_id', verifyToken, getCourseById)

// Protected routes
router.post('/create', verifyToken, verifyTeacher, isSuperTeacher, uploadThumbnail, createCourse)
router.put('/:course_id/add-teacher', verifyToken, verifyTeacher, isSuperTeacher, addTeachersToCourse)
router.put('/update/:course_id', verifyToken, verifyTeacher, isSuperTeacher, uploadThumbnail, updateCourse)
router.delete('/delete/:course_id', verifyToken, verifyTeacher, isSuperTeacher, deleteCourse)

export default router;