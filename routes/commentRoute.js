import express from "express";
import { addComment, getCommentByCourse } from "../controllers/commentController.js";
import { protect } from "../middleware/autorization.js";


const router = express.Router();

router
.route("/add-comment/:id")
.post(protect,addComment);

router
.route("/get-comment/:id")
.get(getCommentByCourse);

export default router;