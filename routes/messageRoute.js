import express from "express";
import { protect } from "../middleware/autorization.js";
import {createMessage,getAllMessages,getContacts} from "../controllers/messageController.js"
const router = express.Router();
router
.route("/add-message")
.post(createMessage)
router
.route("/get-all-messages")
.get(getAllMessages)
router
.route("/get-Contacts")
.get(protect,getContacts)
export default router;