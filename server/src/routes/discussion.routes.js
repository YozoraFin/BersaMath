import express from "express"
import { verifyCourseAccess, verifyToken } from "../middleware/authenticate.js"
import { createDiscussion, deleteDiscussion, getDiscuussions } from "../controller/discussion.controller.js"
import { uploadDiscussionImages } from "../middleware/uploadImage.js"
import { createReply, deleteReply, getReplies } from "../controller/reply.controller.js"

const router = express.Router()

// discussion routes
router.post('/:course_id/discussion/create', verifyToken, verifyCourseAccess, uploadDiscussionImages, createDiscussion)
router.get('/:course_id/discussion', verifyToken, verifyCourseAccess, getDiscuussions)
router.delete('/:course_id/discussion/delete/:discussion_id', verifyToken, verifyCourseAccess, deleteDiscussion)

// reply routes
router.post('/:course_id/discussion/:discussion_id/reply/create', verifyToken, verifyCourseAccess, createReply)
router.get('/:course_id/discussion/:discussion_id/reply', verifyToken, verifyCourseAccess, getReplies)
router.delete('/:course_id/discussion/:discussion_id/reply/delete/:reply_id', verifyToken, verifyCourseAccess, deleteReply)

export default router