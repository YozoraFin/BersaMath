import { Teacher } from "../model/teacher.model.js";
import { generateTokens } from "../middleware/authenticate.js";
import { Op } from "sequelize";
import { validatePassword } from "../middleware/password.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, bio, gender } = req.body;
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
      password,
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
          returning: true
        }
      );
  
      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Email verified successfully"
      });
  
    } catch (error) {
    //   console.error("Verification error:", error);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
        error: error.message
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
    const validPassword = await validatePassword(password, teacher.password);

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

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
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
