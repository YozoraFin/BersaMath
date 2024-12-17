import express from "express";
import dotenv from "dotenv";
import db from "../src/config/db.js";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import teacherRoutes from "./routes/teacher.routes.js"
import studentRoutes from "./routes/student.routes.js"
import topicRoutes from "./routes/topic.routes.js"
import courseRoutes from "./routes/course.routes.js"
import enrollmentRoutes from "./routes/enrollment.routes.js"
import lessonRoutes from "./routes/lesson.routes.js"
import practiceRoutes from "./routes/practice.routes.js"
import submissionRoutes from "./routes/submission.routes.js"
import authRoutes from "./routes/auth.routes.js"
import path from 'path';
import { fileURLToPath } from 'url';
import discussionRoutes from "./routes/discussion.routes.js";
import progressRoutes from "./routes/progress.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.json());

// static files
app.use('/public', express.static(path.join(__dirname, '../public')));
// Access files via: http://localhost:5000/public/uploads/profile/image.jpg

// if (process.env.NODE_ENV === 'production') {
//   app.set('trust proxy', 1);
// }

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/teacher', teacherRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/topic', topicRoutes)
app.use('/api/v1/course', courseRoutes, enrollmentRoutes, lessonRoutes, practiceRoutes, submissionRoutes, discussionRoutes, progressRoutes)

app.listen(port, async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
    console.log(`Listening port number ${port}`);
  } catch (error) {
    console.log("Error while connecting to db", error.message);
  }
});
