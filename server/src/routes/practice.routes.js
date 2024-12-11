import express from "express"
import { verifyCourseAccess, verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js"
import { createPractice, deletePractice, getPracticesByLesson, updatePractice } from "../controller/practice.controller.js"

const router = express.Router()

router.post('/:course_id/lesson/:lesson_id/practice/create', verifyToken, verifyTeacher, verifyCourseOwner, createPractice)
router.get('/:course_id/lesson/:lesson_id/practice', verifyToken, verifyCourseAccess, getPracticesByLesson)
router.put('/:course_id/lesson/:lesson_id/practice/update/:practice_id', verifyToken, verifyTeacher, verifyCourseOwner, updatePractice)
router.delete('/:course_id/lesson/:lesson_id/practice/delete/:practice_id', verifyToken, verifyTeacher, verifyCourseOwner, deletePractice)

export default router