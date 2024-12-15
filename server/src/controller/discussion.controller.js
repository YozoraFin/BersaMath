import { Op } from "sequelize";
import { Discussion } from "../model/discussion.model.js";
import { Student } from "../model/student.model.js";
import { Teacher } from "../model/teacher.model.js";
import { DiscussionReply } from "../model/discussionReply.model.js";

export const createDiscussion = async (req, res) => {
  try {
    const { course_id } = req.params;
    const student_id = req.userId;
    const { content, title } = req.body;

    const images = req.file ? req.file.path : null;

    const discussion = await Discussion.create({
      course_id,
      student_id,
      content,
      title,
      images,
    });

    const student = await Student.findByPk(student_id);

    res.status(201).json({
      success: true,
      message: "Discussion created successfully",
      data: {
        ...discussion.toJSON(),
        student: {
          name: student.name,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create discussion",
      error: error.message,
    });
  }
};

export const getDiscuussions = async (req, res) => {
  try {
    const { course_id } = req.params;
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "created_at",
      order = "DESC",
    } = req.query;

    const whereClause = {
      course_id,
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    };

    const offset = (page - 1) * limit;
    const totalDiscussions = await Discussion.count({ where: whereClause });

    const discussions = await Discussion.findAll({
      where: whereClause,
      include: [
        {
          model: Student,
          attributes: ["name"],
          required: false,
        },
        {
            model: DiscussionReply,
            attributes: ["reply_id","content"],
        }
      ],
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "Discussions fetched successfully",
      data: discussions,
      metadata: {
        total: totalDiscussions,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalDiscussions / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch discussions",
      error: error.message,
    });
  }
};

export const deleteDiscussion = async (req, res) => {
  try {
    const { discussion_id } = req.params;
    const student_id = req.userId;

    const discussion = await Discussion.findOne({
      where: {
        discussion_id,
        student_id,
      },
    });

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    await discussion.destroy();

    res.status(200).json({
      success: true,
      message: "Discussion deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete discussion",
    });
  }
};
