import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export default storage;
