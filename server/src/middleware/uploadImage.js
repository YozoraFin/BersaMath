import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';

// create directory
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads"));
//   },
//   filename: function (req, file, cb) {
//     // unique string sequence to save file in uploads dir
//     const uniquePrefix = Date.now() + Math.random().toString();
//     cb(null, uniquePrefix + file.originalname);
//   },
// });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // unique string sequence to save file in uploads dir
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

// filter tipe file
const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer init
const upload = multer({
  storage,
  limits: 1024 * 1024 * 20, // 20mb limit size
  fileFilter,
});

// single upload
const uploadSingle = function (fileKey) {
  // return a middleware function
  return function (req, res, next) {
    const uploadItem = upload.single(fileKey);
    uploadItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // multer error ketika upload
        return res.status(500).json({ message: err.message });
      } else if (err) {
        // error tidak diketahui
        return res.status(500).json({ message: err.message });
      } else {
        // lanjut tidak ada kendala
        return next();
      }
    });
  };
};

// multiple upload
const uploadMultiple = function (fileKey) {
  return function (req, res, next) {
    const uploadItem = upload.array(fileKey, 10);
    uploadItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // multer error ketika upload
        return res.status(500).json({ message: err.message });
      } else if (err) {
        // error tidak diketahui
        return res.status(500).json({ message: err.message });
      } else {
        // lanjut tidak ada kendala
        return next();
      }
    });
  };
};

export default {
  uploadSingle,
  uploadMultiple,
};
