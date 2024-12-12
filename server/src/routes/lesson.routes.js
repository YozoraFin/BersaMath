import express from "express"
import { verifyCourseAccess, verifyCourseOwner, verifyTeacher, verifyToken } from "../middleware/authenticate.js"
import { createLesson, deleteLesson, getLessonsByCourse, updateLesson } from "../controller/lesson.controller.js"
import { createLessonContent, deleteLessonContent, getLessonContents, updateLessonContent } from "../controller/lessonContent.controller.js"
import { handleContent } from "../middleware/handleContent.js"

const router = express.Router()

router.get('/:course_id/lesson', verifyToken, verifyCourseAccess, getLessonsByCourse)
router.post('/:course_id/lesson/create', verifyToken, verifyCourseOwner, verifyTeacher, createLesson)
router.put('/:course_id/lesson/update/:lesson_id', verifyToken, verifyTeacher, verifyCourseOwner, updateLesson)
router.delete('/:course_id/lesson/delete/:lesson_id', verifyToken, verifyTeacher, verifyCourseOwner, deleteLesson)

// content here
router.get('/:course_id/lesson/:lesson_id/content', verifyToken, verifyCourseAccess, getLessonContents)
router.post('/:course_id/lesson/:lesson_id/content/create', verifyToken, verifyCourseOwner, verifyTeacher, handleContent, createLessonContent)
router.put('/:course_id/lesson/:lesson_id/content/update/:content_id', verifyToken, verifyTeacher, handleContent, verifyCourseOwner, updateLessonContent)
router.delete('/:course_id/lesson/:lesson_id/content/delete/:content_id', verifyToken, verifyTeacher, verifyCourseOwner, deleteLessonContent)

export default router