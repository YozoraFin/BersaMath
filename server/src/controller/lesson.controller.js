import { literal, Op } from "sequelize";
import { Lesson } from "../model/lesson.model.js";
import { Course } from "../model/course.model.js";

export const createLesson = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { title, description, lesson_type } = req.body;

    const maxSequence = await Lesson.max("sequence", {
      where: { course_id },
    });
    const lesson = await Lesson.create({
      course_id,
      title,
      description,
      lesson_type,
      sequence: (maxSequence || 0) + 1,
    });

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create lesson",
      error: error.message,
    });
  }
};

export const getLessonsByCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    const lessons = await Lesson.findAll({
      where: { course_id },
      order: [["sequence", "ASC"]],
      include: [
        {
          model: Course,
          attributes: ["title"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Lessons fetched successfully",
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lessons",
      error: error.message,
    });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { title, description, lesson_type, sequence } = req.body;
    const teacher_id = req.userId;

    const lesson = await Lesson.findOne({
      where: { lesson_id },
      include: [
        {
          model: Course,
          where: { teacher_id },
        },
      ],
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    await Lesson.update({
      title,
      description,
      lesson_type,
      sequence,
    });

    res.json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update lesson",
      error: error.message,
    });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const teacher_id = req.userId;

    const lesson = await Lesson.findOne({
      where: { lesson_id },
      include: [
        {
          model: Course,
          where: { teacher_id },
        },
      ],
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    const currentSequence = lesson.sequence;
    const course_id = lesson.course_id;

    await lesson.destroy();

    await Lesson.update(
      {
        sequence: literal("sequence - 1"),
      },
      {
        where: {
          course_id,
          sequence: {
            [Op.gt]: currentSequence,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete lesson",
      error: error.message,
    });
  }
};
