import express from "express";
import { addlesson } from "../controllers/lessonController.js";
import upload from "../middleware/storage-video.js";
const router = express.Router();

router
.route("/add-lesson")
.post(upload.single("video"),addlesson)

export default router;