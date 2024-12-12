// middleware/uploadSubmission.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory
if (!fs.existsSync("./public/uploads/submissions")) {
  fs.mkdirSync("./public/uploads/submissions", { recursive: true });
}

// Submission storage
const submissionStorage = multer.diskStorage({
  destination: "./public/uploads/submissions",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `submission-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter for submissions
const submissionFilter = (req, file, cb) => {
  const allowedTypes = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/jpg": ".jpg",
  };

  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files (JPG, PNG) are allowed!"), false);
  }
};

// Export middleware
export const uploadSubmission = multer({
  storage: submissionStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 3, // Max 3 files per submission
  },
  fileFilter: submissionFilter,
}).array("submission_files", 3);
