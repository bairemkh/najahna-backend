import express from "express";
import multer from '../middleware/multer-config.js';
import { archivedMyCourse, createCourse, getAllCourses, getMyOwnerCourses, updateMyCourses } from "../controllers/courseController.js";
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

router
.route("/update-myCourse/:_id")
.put(protect,trainer,multer,updateMyCourses)

router
.route("/archived/:_id")
.put(protect,trainer,multer,archivedMyCourse)

export default router;