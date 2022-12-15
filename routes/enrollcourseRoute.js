import express from "express";
import { enrollInCourse, getMycoursesEnrolled } from "../controllers/enrollcourseController.js";
import { protect } from '../middleware/autorization.js';

const router = express.Router();

router
.route("/enrollincourse/:_id")
.post(protect,enrollInCourse)

router
.route("/getmycourses")
.get(protect,getMycoursesEnrolled)

export default router;