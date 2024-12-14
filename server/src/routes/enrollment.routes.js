import express from "express";
import { verifyCourseAccess, verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js";
import { createEnrollment, getEnrollmentById, getStudentEnrollments, updateEnrollmentStatus } from "../controller/enrollment.controller.js";
import { deleteCourse } from "../controller/course.controller.js";

const router = express.Router();

// student routes
router.get('/enrollment/my-enroll/:enrollment_id', verifyToken, getEnrollmentById)
router.get('/enrollment/my-enroll', verifyToken, getStudentEnrollments)
router.post('/enroll', verifyToken, createEnrollment)
router.delete('/:course_id/unenroll/:enrollment_id', verifyToken, verifyCourseAccess, deleteCourse)

// teacher routes
router.put('/:course_id/enrollment/update/:enrollment_id', verifyToken, verifyCourseOwner, verifyTeacher, updateEnrollmentStatus)

export default router;