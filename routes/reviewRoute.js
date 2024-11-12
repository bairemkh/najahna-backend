import express from "express";
import { addReviewCourse } from "../controllers/reviewController.js";
import { protect, trainer } from "../middleware/autorization.js";

const router = express.Router();

router
.route("/add-review/:id")
.post(protect,addReviewCourse)


export default router;