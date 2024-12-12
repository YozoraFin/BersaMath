import { Course } from "../model/course.model.js";
import { Teacher } from "../model/teacher.model.js";
import { Topic } from "../model/topic.model.js";
import { Enrollment } from "../model/enrollment.model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, difficulty, topic_id } = req.body;
    const teacher_id = req.userId;

    const thumbnail = req.file ? req.file.path : null;

    const topic = await Topic.findByPk(topic_id);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    const existingCourse = await Course.findOne({
      where: {
        title,
        teacher_id,
      },
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course title already exists",
      });
    }

    const course = await Course.create({
      title,
      description,
      difficulty,
      thumbnail,
      topic_id,
      teacher_id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Teacher,
          attributes: ["name"]
        },
        {
          model: Topic,
          attributes: ["title"]
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { course_id } = req.params;

    const course = await Course.findOne({
      where: { course_id },
      include: [
        {
          model: Teacher,
          attributes: ["name"],
        },
        {
          model: Topic,
          attributes: ["title"],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
        data: {
          ...course,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { title, description, difficulty, topic_id } = req.body;

    const course = await Course.findOne({
      where: { course_id: course_id, teacher_id: req.userId },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    const thumbnail = req.file ? req.file.path : course.thumbnail;

    await Course.update(
      {
        title,
        description,
        topic_id,
        difficulty,
        thumbnail,
      },
      {
        where: { course_id: course_id },
      }
    );

    const updatedCourse = await Course.findByPk(course_id);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const teacher_id = req.userId;

    const course = await Course.findOne({
      where: {
        course_id,
        teacher_id,
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    await course.destroy();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};
