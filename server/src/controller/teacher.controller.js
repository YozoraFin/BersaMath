import { Teacher } from "../model/teacher.model.js";
import { generateTokens } from "../middleware/authenticate.js";
import { Op } from "sequelize";
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

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, bio, gender } = req.body;
    const hashPassword = passwordUtils.hashPassword(password)
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

export const verifyEmail = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const teacher = await Teacher.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { phone: identifier }],
      },
    });
    const isValidPassword = await passwordUtils.comparePassword(password, teacher.password);
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

    const tokens = generateTokens(teacher.teacher_id, "teacher");

    await teacher.update({ refresh_token: tokens.refreshToken });

    return res.status(200).json({
      success: true,
      message: "Login successful",
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
      message: "Login failed",
      error: error.message,
    });
  }
};

export const requestResetPassword = async (req, res) => {
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

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashPassword = await passwordUtils.hashPassword(newPassword)

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
