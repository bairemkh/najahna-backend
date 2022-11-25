import express from "express";
import { addSection } from "../controllers/sectionController.js";
import { protect, trainer } from "../middleware/autorization.js";

const router = express.Router();

router
.route("/add-section/:id")
.post(protect,trainer,addSection)

export default router;