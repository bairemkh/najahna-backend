import express from "express";
import {createMessage} from "../controllers/messageController.js"
const router = express.Router();
router
.route("/add-message")
.post(createMessage)

export default router;