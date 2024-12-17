// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { Teacher } from "../model/teacher.model.js";
import { Student } from "../model/student.model.js";
import { Course } from "../model/course.model.js";
import { Enrollment } from "../model/enrollment.model.js";
import sequelize from "sequelize";

// Verify JWT token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Generate tokens
export const generateTokens = async (userId, role) => {
  try {
    let courseId = null;
    if (role === 'teacher') {
      const teacher = await Teacher.findOne({
        attributes: ['course_id'],
        where: { teacher_id: userId }
      });
      
      courseId = teacher?.course_id || null;
    }

    const tokens = {
      accessToken: jwt.sign(
        { id: userId, role, ...(role === 'teacher' ? { courseId } : {}) },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      ),
      refreshToken: jwt.sign(
        { id: userId, role, ...(role === 'teacher' ? { courseId } : {}) },
        process.env.JWT_REFRESH_SECRET_KEY,
        { expiresIn: "7d" }
      )
    };

    // console.log('Generated tokens:', tokens); // Debug log
    return tokens;
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
};

// export const verifyTeacherCourseAccess = async (req, res, next) => {
//   try {
//     const { course_id } = req.params;
//     const { courses } = req.user; // From decoded token

//     if (!courses.includes(parseInt(course_id))) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to access this course"
//       });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to verify course access",
//       error: error.message
//     });
//   }
// };

// Handle refresh token
export const handleRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY
    );
    const Model = decoded.role === "teacher" ? Teacher : Student;

    const user = await Model.findOne({
      where: {
        [`${decoded.role}_id`]: decoded.id,
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const tokens = generateTokens(decoded.id, decoded.role);
    await user.update({ refresh_token: tokens.refreshToken });

    res.json(tokens);
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const isSuperTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.userId);

    if (!teacher || teacher.role !== "super_teacher") {
      return res.status(403).json({
        success: false,
        message: "Requires super teacher privileges",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByPk(req.userId);

    if (!teacher) {
      return res.status(403).json({
        success: false,
        message: "Teacher access required",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify teacher",
      error: error.message,
    });
  }
};

export const verifyCourseOwner = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const teacher_id = req.userId;

    const course = await Course.findOne({
      where: { course_id, teacher_id },
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access course",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify course ownership",
      error: error.message,
    });
  }
};

export const verifyCourseAccess = async (req, res, next) => {
  try {
    const { course_id } = req.params;
    const userId = req.userId;
    const userRole = req.role;

    // If user is a teacher, allow access
    if (userRole === "teacher") {
      const course = await Course.findOne({
        where: {
          course_id
        },
      });
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }
      
      return next();
    }

    // Check student enrollment
    const enrollment = await Enrollment.findOne({
      where: {
        student_id: userId,
        course_id,
        status: "aktif",
      },
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access course - Please enroll first",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify course access",
      error: error.message,
    });
  }
};
