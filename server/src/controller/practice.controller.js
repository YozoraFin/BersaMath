import { Lesson } from "../model/lesson.model.js";
import { Practice } from "../model/practice.model.js";

export const createPractice = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    const { question, description, difficulty, max_score, due_date } = req.body;
    const lesson = await Lesson.findOne({
      where: { lesson_id },
    });

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    if (lesson.lesson_type !== "kuis") {
      return res.status(400).json({
        success: false,
        message: "Practice can only be created for quiz lessons",
      });
    }

    const currentDate = new Date();
    const practiceDate = new Date(due_date);

    if (practiceDate < currentDate) {
      return res.status(400).json({
        success: false,
        message: "Due date cannot be in the past",
      });
    }

    if (max_score < 0 || max_score > 100) {
      return res.status(400).json({
        success: false,
        message: "Max score must be between 0 and 100",
      });
    }

    const practice = await Practice.create({
      lesson_id,
      question,
      description,
      difficulty,
      max_score,
      due_date: practiceDate,
    });

    res.status(201).json({
      success: true,
      message: "Practice created successfully",
      data: practice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create practice",
      error: error.message,
    });
  }
};

export const getPracticesByLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;

    const practices = await Practice.findAll({
      where: { lesson_id },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Practices fetched successfully",
      data: practices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch practices",
      error: error.message,
    });
  }
};

export const updatePractice = async (req, res) => {
  try {
    const { practice_id } = req.params;
    const { question, description, difficlty, max_score, due_date } = req.body;

    const practice = await Practice.findByPk(practice_id);

    if (!practice) {
      return res.status(404).json({
        success: false,
        message: "Practice not found",
      });
    }

    if (due_date) {
      const currentDate = new Date();
      const newDueDate = new Date(due_date);

      if (newDueDate < currentDate) {
        return res.status(400).json({
          success: false,
          message: "Due date cannot be in the past",
        });
      }
    }

    if (max_score && (max_score < 0 || max_score > 100)) {
      return res.status(400).json({
        success: false,
        message: "Max score must be between 0 and 100",
      });
    }

    await practice.update({
      question,
      description,
      difficlty,
      max_score,
      due_date: due_date ? new Date(due_date) : practice.due_date,
    });

    res.status(200).json({
      success: true,
      message: "Practice updated successfully",
      data: practice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update practice",
      error: error.message,
    });
  }
};

export const deletePractice = async (req, res) => {
  try {
    const { practice_id } = req.params;
    const practice = await Practice.findByPk(practice_id);

    if (!practice) {
      return res.status(404).json({
        success: false,
        message: "Practice not found",
      });
    }

    await practice.destroy();

    res.status(200).json({
      success: true,
      message: "Practice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete practice",
    });
  }
};
