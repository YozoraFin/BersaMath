import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

// Fungsi untuk menghasilkan access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
};

// Fungsi untuk menghasilkan refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
};

// Fungsi untuk memverifikasi refresh token
const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

export {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
