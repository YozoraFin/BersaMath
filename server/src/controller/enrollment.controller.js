import { Course } from "../model/course.model.js";
import { Enrollment } from "../model/enrollment.model.js";
import { Teacher } from "../model/teacher.model.js";

export const createEnrollment = async (req, res) => {
  try {
    const { course_id } = req.body;
    const student_id = req.userId;

    const existingEnrollment = await Enrollment.findOne({
      where: {
        student_id,
        course_id,
      },
    });

    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You have already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      student_id,
      course_id,
      status: "aktif",
    });

    res.status(201).json({
      success: true,
      message: "Successfully enrolled in the course",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create enrollment",
      error: error.message,
    });
  }
};

export const getStudentEnrollments = async (req, res) => {
  try {
    const student_id = req.userId;
    const enrollment = await Enrollment.findAll({
      where: { student_id },
      include: {
        model: Course,
        attributes: ["title", "difficulty"],
        include: [
          {
            model: Teacher,
            attributes: ["name"],
          },
        ],
      },
    });

    if (!enrollment || enrollment.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No enrollments found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollments fetched successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get enrollments",
      error: error.message,
    });
  }
};

export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const { status } = req.body;
    const teacher_id = req.userId;

    if (!["aktif", "selesai", "keluar"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id,
      },
      include: [
        {
          model: Course,
          where: { teacher_id },
          required: true,
        },
      ],
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found or unauthorized",
      });
    }

    await enrollment.update({ status });

    res.status(200).json({
      success: true,
      message: "Enrollment status updated successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update enrollment status",
      error: error.message,
    });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const { enrollment_id } = req.params;
    const student_id = req.userId;

    const enrollment = await Enrollment.findOne({
      where: {
        enrollment_id,
        student_id,
      },
      include: {
        model: Course,
        attributes: ["title", "difficulty"],
        include: [
          {
            model: Teacher,
            attributes: ["name"],
          },
        ],
      },
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment fetched successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get enrollment",
      error: error.message,
    });
  }
};

export const deleteEnrollment = async (req, res) => {
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
      message: "Enrollment not found or unauthorized",
    });
  }

  await enrollment.destroy();

  res.status(200).json({
    success: true,
    message: "Enrollment deleted successfully",
  });
};
