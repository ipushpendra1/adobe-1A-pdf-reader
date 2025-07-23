const express = require("express");
const { uploadPost } = require("../controllers/upload.controller");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/uploads", upload.single("file"), uploadPost);

module.exports = router;
