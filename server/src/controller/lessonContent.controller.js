import { Op } from "sequelize";
import { Course } from "../model/course.model.js";
import { Lesson } from "../model/lesson.model.js";
import { LessonContent } from "../model/lessonContent.model.js";


export const createLessonContent = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { title, content_type, content_url, content, sequence } = req.body;

    // Get max sequence if not provided
    const maxSequence = await LessonContent.max("sequence", {
      where: { lesson_id },
    });

    const createContent = await LessonContent.create({
      title,
      lesson_id,
      content_type,
      content,
      content_url: req.file ? req.file.path.toString() : content_url,
      sequence: sequence || (maxSequence ? maxSequence + 1 : 1),
    });

    res.status(201).json({
      success: true,
      message: "Lesson content created successfully",
      data: createContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create lesson content",
      error: error.message,
    });
  }
};

export const getLessonContents = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const {
      page = 1,
      limit = 10,
      search = '',
      content_type,
      sort = 'sequence',
      order = 'ASC'
    } = req.query;

    const whereClause = {
      lesson_id,
      [Op.and]: [
        search ? {
          title: {
            [Op.like]: `%${search}%`
          }
        } : {},
        content_type ? { content_type } : {}
      ]
    };

    const offset = (page - 1) * limit;
    const totalContents = await LessonContent.count({ where: whereClause });

    const contents = await LessonContent.findAll({
      where: whereClause,
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      message: "Lesson contents fetched successfully",
      data: contents,
      metadata: {
        total: totalContents,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalContents / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contents",
      error: error.message,
    });
  }
};

export const updateLessonContent = async (req, res) => {
  try {
    const { content_id } = req.params;
    const { type, content_url, sequence } = req.body;
    const teacher_id = req.userId;

    const content = await LessonContent.findOne({
      where: { content_id },
      include: [
        {
          model: Lesson,
          include: [
            {
              model: Course,
              where: { teacher_id },
            },
          ],
        },
      ],
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found or unauthorized",
      });
    }

    await content.update({
      type,
      content_url: type === "video" ? content_url : req.file?.path,
      sequence,
    });

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update content",
      error: error.message,
    });
  }
};

export const deleteLessonContent = async (req, res) => {
  try {
    const { content_id } = req.params;
    const teacher_id = req.userId;

    const content = await LessonContent.findOne({
      where: { content_id },
      include: [
        {
          model: Lesson,
          include: [
            {
              model: Course,
              where: { teacher_id },
            },
          ],
        },
      ],
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found or unauthorized",
      });
    }

    await content.destroy();

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete content",
      error: error.message,
    });
  }
};
