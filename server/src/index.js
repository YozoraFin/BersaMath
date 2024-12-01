import express from "express";
import dotenv from "dotenv";
import db from "../src/config/db.js";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const app = express();
const port = process.env.PORT;

// rate limit dan speed limit untuk mencegah serangan ddos

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // limit setiap IP
  message: "Too many requests from this IP, please try again later",
  standarHeaders: true,
  legacyHeaders: false,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 menit
  delayAfter: 50, // mengizinkan 50 request per 15 menit, kemudian setiap request akan delay
  delayMs: () => 500,
});

app.use(limiter);
app.use(speedLimiter);

app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    maxAge: 3600,
  })
);

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
// }

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
    console.log(`Listening port number ${port}`);
  } catch (error) {
    console.log("Error while connecting to db", error.message);
  }
});
