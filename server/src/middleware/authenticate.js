// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { Teacher } from "../model/teacher.model.js";
import { Student } from "../model/student.model.js";

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
export const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Verify user role
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};

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
