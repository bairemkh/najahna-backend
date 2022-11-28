import express from "express";
import { addSection, getSectionById } from "../controllers/sectionController.js";
import { protect, trainer } from "../middleware/autorization.js";

const router = express.Router();

router
.route("/add-section/:id")
.post(protect,trainer,addSection)

router
.route("/getsection/:id")
.get(getSectionById)

export default router;