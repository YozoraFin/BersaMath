import { Op } from "sequelize";
import { generateTokens } from "../middleware/authenticate.js";
import { Student } from "../model/student.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import passwordUtils from "../middleware/password.js";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const studentRegister = async (req, res) => {
  try {
    const { name, email, password, phone, bio, gender, grade_level } = req.body;
    const hashPassword = passwordUtils.hashPassword(password);
    const emailExists = await Student.findOne({
      where: { email: email.toLowerCase() },
    });
    const phoneExists = await Student.findOne({
      where: { phone: phone },
    });

    if (emailExists || phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone already registered",
      });
    }

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      phone,
      bio,
      gender,
      is_verified: false,
      grade_level,
    });

    const tokens = generateTokens(student.student_id);

    const token = jwt.sign(
      { id: student.student_id },
      process.env.EMAIL_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: student.email,
        subject: "Verify Your Email",
        html: `
              <h1>Email Verification</h1>
              <p>Click this link to verify your email:</p>
              <a href="${verificationLink}">${verificationLink}</a>
            `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Continue with registration even if email fails
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email",
      data: {
        student: {
          id: student.student_id,
          name: student.name,
          email: student.email,
        },
        tokens,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Register failed",
      error: error.message,
    });
  }
};

export const studentVerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY);

    const student = await Student.update(
      { is_verified: true },
      {
        where: { student_id: decoded.id },
        returning: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    //   console.error("Verification error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification token",
      error: error.message,
    });
  }
};

export const studentLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const student = await Student.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { phone: identifier }],
      },
    });
    const isValidPassword = passwordUtils.comparePassword(
      password,
      student.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (!student.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const tokens = await generateTokens(student.student_id, 'student');

    await student.update({ refresh_token: tokens.refreshToken });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        student: {
          id: student.student_id,
          name: student.name,
          email: student.email,
        },
        tokens: tokens,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

export const studentRequestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const token = jwt.sign(
      { id: student.student_id },
      process.env.RESET_SECRET_KEY,
      { expiresIn: "30m" }
    );
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Reset Password",
      html: `
                <h2>Reset Password</h2>
                <p>Klik link berikut untuk mereset password Anda:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Link ini akan kadaluarsa dalam 30 menit.</p>
              `,
    });

    res.status(200).json({
      success: true,
      message: "Reset password link has been sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reset password failed",
      error: error.message,
    });
  }
};

export const studentResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashPassword = passwordUtils.hashPassword(newPassword);

    // Validate password format
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const decoded = jwt.verify(token, process.env.RESET_SECRET_KEY);

    const student = await Student.findByPk(decoded.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Password will be hashed by middleware
    await student.update({ password: hashPassword });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Reset password link has expired",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const student = await Student.findByPk(req.userId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update({ refresh_token: null });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      grade_level,
      gender,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const whereClause = {
      [Op.and]: [
        search ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ]
        } : {},
        grade_level ? { grade_level } : {},
        gender ? { gender } : {}
      ]
    };

    const offset = (page - 1) * limit;
    const totalStudents = await Student.count({ where: whereClause });

    if (totalStudents === 0) {
      return res.status(200).json({
        success: true,
        message: "No students found with given criteria",
        data: [],
        metadata: {
          total: 0,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: 0
        }
      });
    }

    const students = await Student.findAll({
      where: whereClause,
      attributes: { exclude: ['password', 'refresh_token'] },
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
      metadata: {
        total: totalStudents,
        page: parseInt(page),
      limit: parseInt(limit),
        pages: Math.ceil(totalStudents / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token"],
      },
      // include: [{
      //   model: Enrollment,
      //   include: [{
      //     model: Course,
      //     attributes: ['title', 'difficulty'],
      //     include: [{
      //       model: Teacher,
      //       attributes: ['name']
      //     }]
      //   }]
      // }],
      // raw: true,
      // nest: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data:student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { name, bio, grade_level } = req.body;
    const student = await Student.findByPk(req.userId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const profile_pict = req.file ? req.file.path : student.profile_pict;

    await student.update({
      name,
      bio,
      grade_level,
      profile_pict,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: student.student_id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        bio: student.bio,
        gender: student.gender,
        grade_level: student.grade_level,
        profile_pict: student.profile_pict,
        updated_at: student.updated_at,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
