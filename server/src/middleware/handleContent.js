import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory
if (!fs.existsSync("./public/uploads/content")) {
  fs.mkdirSync("./public/uploads/content", { recursive: true });
}

// Configure storage for files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/content");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `content-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter for PDFs
const fileFilter = (req, file, cb) => {
  const contentType = req.body.content_type;

  // MIME types for different content types
  const allowedMimeTypes = {
    text: ["application/pdf"],
    file: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ],
  };

  if (contentType === "text" && allowedMimeTypes.text.includes(file.mimetype)) {
    cb(null, true);
  } else if (
    contentType === "file" &&
    allowedMimeTypes.file.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    const errorMessage =
      contentType === "text"
        ? "Only PDF files are allowed for text content!"
        : "Only PDF, DOC, DOCX, JPG and PNG files are allowed!";
    cb(new Error(errorMessage), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("content_url");

const isValidYoutubeUrl = (url) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?si=[a-zA-Z0-9_-]+)?$/;
  return youtubeRegex.test(url);
};

// Content type handler middleware
export const handleContent = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    const { content_type, content_url } = req.body;

    // Validate content type
    const validTypes = ["text", "video", "file"];
    if (!validTypes.includes(content_type)) {
      return res.status(400).json({
        success: false,
        message: "Content type must be text, video, or file",
      });
    }

    // Type-specific validation
    switch (content_type) {
      case "video":
        if (!content_url || !isValidYoutubeUrl(content_url)) {
          return res.status(400).json({
            success: false,
            message: "Valid YouTube URL is required",
          });
        }
        break;

      case "file":
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "File upload is required",
          });
        }
        break;

      case "text":
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "Content URL / File is required",
          });
        }
        break;
    }

    next();
  });
};
