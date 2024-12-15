import { Discussion } from "../model/discussion.model.js";
import { DiscussionReply } from "../model/discussionReply.model.js";
import { Student } from "../model/student.model.js";

export const createReply = async (req, res) => {
  try {
    const { discussion_id } = req.params;
    const student_id = req.userId;
    const { content } = req.body;
    const images = req.file ? req.file.path : null;

    const discussion = await Discussion.findByPk(discussion_id);
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    if (!content) {
        return res.status(400).json({
          success: false,
          message: "Content is required"
        });
      }

    const reply = await DiscussionReply.create({
      discussion_id,
      student_id,
      content,
      images,
    });

    await Discussion.increment("reply_count", {
      where: { discussion_id },
    });

    const replyWithUser = await DiscussionReply.findOne({
      where: { reply_id: reply.reply_id },
      include: [
        {
          model: Student,
          attributes: ["name", "profile_pict"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Reply created successfully",
      data: replyWithUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create reply",
      error: error.message,
    });
  }
};

export const getReplies = async (req, res) => {
  try {
    const { discussion_id } = req.params;

    const replies = await DiscussionReply.findAll({
      where: { discussion_id },
      include: [
        {
          model: Student,
          attributes: ["name", "profile_pict"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      data: replies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get replies",
      error: error.message,
    });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { reply_id, discussion_id } = req.params;
    const student_id = req.userId;

    const reply = await DiscussionReply.findOne({
      where: {
        reply_id,
        student_id,
      },
    });

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    await reply.destroy();

    await Discussion.decrement("reply_count", {
      where: { discussion_id },
    });

    res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete reply",
      error: error.message,
    });
  }
};
