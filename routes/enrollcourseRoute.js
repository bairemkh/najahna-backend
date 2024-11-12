import express from "express";
import { enrollInCourse, getCertifcate, getMycoursesCompleted, getMycoursesEnrolled, userProgressInCourse } from "../controllers/enrollcourseController.js";
import { protect } from '../middleware/autorization.js';

const router = express.Router();

router
.route("/enrollincourse/:_id")
.post(protect,enrollInCourse)

router
.route("/getmycourses")
.get(protect,getMycoursesEnrolled)

router
.route("/getmycoursescompleted")
.get(protect,getMycoursesCompleted)

router
.route("/progress/:_id")
.post(protect,userProgressInCourse);

router
.route("/certif/:_id")
.post(protect,getCertifcate);

export default router;