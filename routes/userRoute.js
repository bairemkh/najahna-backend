import express from 'express';
import { profile, signin, signup } from '../controllers/userController.js';
import { protect } from '../middleware/autorization.js';

const router = express.Router();

router
.route("/signup")
.post(signup)

router
.route("/signin")
.post(signin)

router
.route("/profile")
.get(protect,profile)
export default router;