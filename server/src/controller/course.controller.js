import { Op } from "sequelize";
import { Course } from "../model/course.model.js";
import { Teacher } from "../model/teacher.model.js";
import { Topic } from "../model/topic.model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, difficulty, topic_id } = req.body;

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

export const addTeachersToCourse = async (req, res) => {
  try {
    const { course_id } = req.params;
    const {teacher_id} = req.body

    const existingTeacher = await Teacher.findByPk(teacher_id);
    const existingCourse = await Course.findByPk(course_id);

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const addTeacher = await Teacher.update({
      course_id
    }, {
      where: { teacher_id }
    })

    res.status(200).json({
      success: true,
      message: "Teachers added to course successfully",
      data: addTeacher
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add teachers to course",
      error: error.message,
    })
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search= '',
      difficulty,
      topic_id,
      sort = 'created_at',
      order = 'DESC',
    } = req.query;

    const whereClause = {
      [Op.and]: [
        search? {
          title: {
            [Op.like]: `%${search}%`
          }
        } : {},
        difficulty? { difficulty } : {},
        topic_id? { topic_id } : {}
      ]
    }

    const offset = (page - 1) * limit
    const totalCourses = await Course.count({where: whereClause})

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
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
      metadata: {
        totalCourses,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCourses / limit)
      }
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
