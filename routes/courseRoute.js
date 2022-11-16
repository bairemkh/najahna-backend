import express from "express";
import multer from '../middleware/multer-config.js';
import { createCourse, getAllCourses, getMyOwnerCourses } from "../controllers/courseController.js";
import { protect, trainer } from "../middleware/autorization.js";

const router = express.Router();

router
.route("/add-course")
.post(protect,trainer,multer,createCourse)

router
.route("/getall")
.get(getAllCourses)

router
.route("/mycourses")
.get(protect,trainer,getMyOwnerCourses)

export default router;