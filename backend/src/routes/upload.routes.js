import express from "express";
import { uploadPost } from "../controllers/upload.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/uploads", upload.single("file"), uploadPost);

export default router;
