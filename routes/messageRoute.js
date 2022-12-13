import express from "express";
import {createMessage,getAllMessages} from "../controllers/messageController.js"
const router = express.Router();
router
.route("/add-message")
.post(createMessage)
router
.route("/get-all-messages")
.get(getAllMessages)
export default router;