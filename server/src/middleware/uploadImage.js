import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directories if they don't exist
const dirs = ["./public/uploads/profile", "./public/uploads/thumbnail", "./public/uploads/discussion"];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Profile image storage
const profileStorage = multer.diskStorage({
  destination: "./public/uploads/profile",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `profile-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Thumbnail storage
const thumbnailStorage = multer.diskStorage({
  destination: "./public/uploads/thumbnail",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `thumbnail-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Discussion images storage
const discussionStorage = multer.diskStorage({
  destination: "./public/uploads/discussion",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `discussion-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Separate middleware for each type
export const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: imageFilter,
}).single("profile_pict");

export const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
}).single("thumbnail");
export const uploadDiscussionImages = multer({
  storage: discussionStorage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
  fileFilter: imageFilter,
}).single("iamges");