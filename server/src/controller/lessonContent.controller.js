import { Course } from "../model/course.model.js";
import { Lesson } from "../model/lesson.model.js";
import { LessonContent } from "../model/lessonContent.model.js";


export const createLessonContent = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { title, content_type, content_url, sequence } = req.body;

    // Get max sequence if not provided
    const maxSequence = await LessonContent.max("sequence", {
      where: { lesson_id },
    });

    const content = await LessonContent.create({
      title,
      lesson_id,
      content_type,
      content_url: req.file ? req.file.path.toString() : content_url,
      sequence: sequence || (maxSequence ? maxSequence + 1 : 1),
    });

    res.status(201).json({
      success: true,
      message: "Lesson content created successfully",
      data: content,
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

    const contents = await LessonContent.findAll({
      where: { lesson_id },
      order: [["sequence", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: "Lesson contents fetched successfully",
      data: contents,
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
