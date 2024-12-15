import { Teacher } from "../model/teacher.model.js";
import { generateTokens } from "../middleware/authenticate.js";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import passwordUtils from "../middleware/password.js";
import { Course } from "../model/course.model.js";

// nodemailer init
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const teacherRegister = async (req, res) => {
  try {
    const { name, email, password, phone, bio, gender } = req.body;
    const hashPassword = passwordUtils.hashPassword(password);
    const emailExists = await Teacher.findOne({
      where: { email: email.toLowerCase() },
    });
    const phoneExists = await Teacher.findOne({
      where: { phone: phone },
    });

    if (emailExists || phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone already registered",
      });
    }

    const teacher = await Teacher.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      phone,
      bio,
      gender,
      is_verified: false,
    });

    const tokens = generateTokens(teacher.teacher_id);

    const token = jwt.sign(
      { id: teacher.teacher_id },
      process.env.EMAIL_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: teacher.email,
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
        teacher: {
          id: teacher.teacher_id,
          name: teacher.name,
          email: teacher.email,
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

export const teacherVerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY);

    // Update teacher verification status
    const teacher = await Teacher.update(
      { is_verified: true },
      {
        where: { teacher_id: decoded.id },
        returning: true,
      }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
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

export const teacherLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const teacher = await Teacher.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { phone: identifier }],
      },
    });
    const isValidPassword = passwordUtils.comparePassword(
      password,
      teacher.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    if (!teacher.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const tokens = await generateTokens(teacher.teacher_id, teacher.role, teacher.course_id);
    console.log('Login response tokens:', tokens); // Debug log

    await teacher.update({ refresh_token: tokens.refreshToken });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        teacher: {
          id: teacher.teacher_id,
          name: teacher.name,
          email: teacher.email,
          role: teacher.role,
          course: teacher.course_id
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

export const teacherRequestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const teacher = await Teacher.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    const token = jwt.sign(
      { id: teacher.teacher_id },
      process.env.RESET_SECRET_KEY,
      { expiresIn: "30m" }
    );
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: teacher.email,
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

export const teacherResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashPassword = await passwordUtils.hashPassword(newPassword);

    // Validate password format
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const decoded = jwt.verify(token, process.env.RESET_SECRET_KEY);

    const teacher = await Teacher.findByPk(decoded.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // Password will be hashed by middleware
    await teacher.update({ password: hashPassword });

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
    const teacher = await Teacher.findByPk(req.userId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    await teacher.update({ refresh_token: null });

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

export const getAllTeachers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      role,
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
        role ? { role } : {},
        gender ? { gender } : {}
      ]
    };

    const offset = (page - 1) * limit;
    const totalTeachers = await Teacher.count({ where: whereClause });

    if (totalTeachers === 0) {
      return res.status(200).json({
        success: true,
        message: "No teachers found with given criteria",
        data: [],
        metadata: {
          total: 0,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: 0
        }
      });
    }

    const teachers = await Teacher.findAll({
      where: whereClause,
      attributes: { exclude: ['password', 'refresh_token'] },
      order: [[sort, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      data: teachers,
      metadata: {
        total: totalTeachers,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalTeachers / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token"],
      },
      include: [{
        model: Course,
        attributes: ["course_id", "title"],
      }]
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher fetched successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};

export const updateTeacherProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const teacher = await Teacher.findByPk(req.userId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const profile_pict = req.file ? req.file.path : teacher.profile_pict;

    await teacher.update({
      name,
      bio,
      profile_pict,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: teacher.teacher_id,
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        bio: teacher.bio,
        gender: teacher.gender,
        profile_pict: teacher.profile_pict,
        updated_at: teacher.updated_at,
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

export const registerSuperTeacher = async (req, res) => {
  try {
    const { name, email, password, phone, bio, gender, registrationCode } =
      req.body;

    // Verify registration code
    if (registrationCode !== process.env.SUPER_TEACHER_SECURE_CODE) {
      return res.status(403).json({
        success: false,
        message: "Invalid registration code",
      });
    }

    const hashPassword = passwordUtils.hashPassword(password);

    // Check existing email/phone
    const emailExists = await Teacher.findOne({
      where: { email: email.toLowerCase() },
    });

    const phoneExists = await Teacher.findOne({
      where: { phone },
    });

    if (emailExists || phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone already registered",
      });
    }

    // Create super teacher with role
    const teacher = await Teacher.create({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      phone,
      bio,
      gender,
      role: "super_teacher",
      is_verified: true, // Auto verify super teachers
    });

    const tokens = generateTokens(teacher.teacher_id, "super_teacher");

    return res.status(201).json({
      success: true,
      message: "Super teacher registration successful",
      data: {
        teacher: {
          id: teacher.teacher_id,
          name: teacher.name,
          email: teacher.email,
          role: teacher.role,
        },
        tokens,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
