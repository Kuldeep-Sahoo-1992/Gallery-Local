import express from "express";
import {
  uploadImages,
  addNewCategory,
  getAllCategories,
  getAllImages,
  getSingleImage,
  // uploadImages,
} from "../controllers/galleryController.js";
import multer from "multer";
import fs from "fs"

const router = express.Router();


const uploadFolder = "public/upload/";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true }); // Create the folder, including parent directories
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// router.post("/upload/image", upload.single("image"), uploadImage);
router.post("/upload/images", upload.array("image"), uploadImages);

router.post("/add/category", addNewCategory);
router.get("/get/categories", getAllCategories);
router.get("/get/images", getAllImages);
router.get("/get/singleImage", getSingleImage);

export default router;
