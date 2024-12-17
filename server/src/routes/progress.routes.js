import express from "express"
import { verifyCourseAccess, verifyToken } from "../middleware/authenticate.js"
import { createProgress, getCourseProgress, getStudentProgress, updateProgress } from "../controller/progress.controller.js"

const router = express.Router()

router.post('/:course_id/progress/create', verifyToken, verifyCourseAccess, createProgress)
router.patch('/:course_id/progress/update/:progress_id', verifyToken, verifyCourseAccess, updateProgress)
router.get('/:course_id/progress/:enrollment_id', verifyToken, verifyCourseAccess, getStudentProgress)
router.get('/:course_id/progress/overview/:enrollment_id', verifyToken, verifyCourseAccess, getCourseProgress)

export default router