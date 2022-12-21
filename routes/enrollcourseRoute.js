import express from "express";
import { enrollInCourse, getMycoursesEnrolled, userProgressInCourse } from "../controllers/enrollcourseController.js";
import { protect } from '../middleware/autorization.js';

const router = express.Router();

router
.route("/enrollincourse/:_id")
.post(protect,enrollInCourse)

router
.route("/getmycourses")
.get(protect,getMycoursesEnrolled)

router
.route("/progress/:_id")
.post(protect,userProgressInCourse);

export default router;