import express from "express";
import { createTopic, deleteTopic, getAllTopics, getTopicById, updateTopic } from "../controller/topic.controller.js";
import { isSuperTeacher, verifyToken } from "../middleware/authenticate.js";

const router = express.Router();

router.get('/', verifyToken, getAllTopics)
router.get('/:id', verifyToken, getTopicById)
router.post('/create', verifyToken, isSuperTeacher, createTopic)
router.put('update/:id', verifyToken, isSuperTeacher, updateTopic)
router.delete('/delete/:id', verifyToken, isSuperTeacher, deleteTopic)

export default router;