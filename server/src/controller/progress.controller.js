import { Enrollment } from "../model/enrollment.model.js";
import { Lesson } from "../model/lesson.model.js";
import { Progress } from "../model/progress.model.js";

export const createProgress = async (req, res) => {
  try {
    const { enrollment_id, lesson_id } = req.body;
    const student_id = req.userId;

    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id,
        student_id,
      },
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized or not enrolled",
      });
    }

    const progress = await Progress.create({
      enrollment_id,
      lesson_id,
      is_completed: false,
      time_spent: 0,
    });

    res.status(201).json({
      success: true,
      message: "Progress created successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create progress",
      error: error.message,
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { progress_id } = req.params;
    const { is_completed } = req.body;
    const student_id = req.userId;

    const progress = await Progress.findOne({
      include: [
        {
          model: Enrollment,
          where: {
            student_id,
          },
        },
      ],
      where: {
        progress_id,
      },
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found",
      });
    }

    const currentTime = new Date();
    const lastUpdate = progress.updated_at;
    const elapsedTime = Math.floor((currentTime - lastUpdate) / 1000);

    await progress.update({
      is_completed,
      time_spent: progress.time_spent + elapsedTime,
    });

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: {
        progress_id: progress.progress_id,
        is_completed: progress.is_completed,
        time_spent: progress.time_spent,
        elapsed_time: elapsedTime,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
      error: error.message,
    });
  }
};

export const getStudentProgress = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const student_id = req.userId;

    const progress = await Progress.findAll({
      include: [
        {
          model: Enrollment,
          where: {
            student_id,
            enrollment_id,
          },
        },
        {
          model: Lesson,
          attributes: ["title", "sequence"],
        },
      ],
      order: [[Lesson, "sequence", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: "Progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get progress",
      error: error.message,
    });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const student_id = req.userId;

    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id,
        student_id,
      },
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const totalLessons = await Lesson.count({
      where: { course_id: enrollment.course_id },
    });

    const completedLessons = await Progress.count({
      where: {
        enrollment_id,
        is_completed: true,
      },
    });

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    res.status(200).json({
      success: true,
      message: "Course progress retrieved successfully",
      data: {
        total_lessons: totalLessons,
        completed_lessons: completedLessons,
        progress_percentage: progressPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get course progress",
      error: error.message,
    });
  }
};
