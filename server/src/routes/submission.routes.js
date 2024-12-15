import express from "express"
import { verifyCourseAccess, verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js"
import { createSubmission, getStudentSubmission, getSubmissionsByPractice, gradeSubmission } from "../controller/submission.controller.js"
import { uploadSubmission } from "../middleware/uploadSubmission.js"

const router = express.Router()

// student routes
router.get('/:course_id/lesson/:lesson_id/practice/:practice_id/my-submission', verifyToken, verifyCourseAccess, getStudentSubmission)
router.post('/:course_id/lesson/:lesson_id/practice/:practice_id/submit', verifyToken, verifyCourseAccess, uploadSubmission, createSubmission)

// teacher routes
router.get('/:course_id/lesson/:lesson_id/practice/:practice_id/submission', verifyToken, verifyTeacher, getSubmissionsByPractice)
router.put('/:course_id/lesson/:lesson_id/practice/:practice_id/submission/:submission_id/grade', verifyToken, verifyTeacher, gradeSubmission)

export default router