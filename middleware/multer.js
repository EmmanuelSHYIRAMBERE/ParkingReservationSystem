import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tour_images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

const tourImagesUpload = upload.fields([
  { name: "backDropImage", maxCount: 1 },
  { name: "gallery", maxCount: 15 },
]);

export default tourImagesUpload;
