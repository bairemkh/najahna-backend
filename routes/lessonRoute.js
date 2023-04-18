import express from "express";
import { addlesson, deleteLesson, updateLesson } from "../controllers/lessonController.js";
import upload from "../middleware/storage-video.js";
const router = express.Router();

router
.route("/add-lesson/:id")
.post(upload.single("video"),addlesson)

router
.route("/update/:lessonId/section/:sectionId")
.put(upload.single("video"),updateLesson)

router
.route("/delete-lesson/:id")
.delete(deleteLesson)

export default router;