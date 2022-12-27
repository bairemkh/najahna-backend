import express from "express";
import multer from '../middleware/multer-config.js';
import{addquiz,addquestion} from '../controllers/quizController.js'
import { archivedMyCourse, createCourse, enrollInCourse, getAllCourses, getCourseById, getCoursesByFields, getMyCourseslist, getMyOwnerCourses, getMyOwnerCoursesArchived, initPayement, searchCourse, updateMyCourses } from "../controllers/courseController.js";
import { protect, trainer } from "../middleware/autorization.js";

const router = express.Router();

router
.route("/add-course")
.post(protect,trainer,multer,createCourse)

router
.route("/course/:id")
.get(getCourseById)

router
.route("/addQuiz/:id")
.post(addquiz)

router
.route("/addQuestionToQuiz/:id")
.post(addquestion)

router
.route("/getall")
.get(getAllCourses)

router
.route("/getby")
.get(getCoursesByFields)

router
.route("/search")
.get(searchCourse)

router
.route("/mycourses")
.get(protect,trainer,getMyOwnerCourses)

router 
.route("/mycourses-archived")
.get(protect,trainer,getMyOwnerCoursesArchived)

router
.route("/update-myCourse/:_id")
.put(protect,trainer,multer,updateMyCourses)

router
.route("/archived/:_id")
.put(protect,trainer,multer,archivedMyCourse)

router
.route("/enrollnow/:_id")
.post(protect,enrollInCourse)

router
.route("/mycourseslist")
.get(protect,getMyCourseslist)

router
.route("/initpayement")
.post(initPayement);

export default router;