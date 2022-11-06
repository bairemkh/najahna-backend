import express from 'express';
import { profile, signin, signup,forgetPassword } from '../controllers/userController.js';
import { protect, trainer } from '../middleware/autorization.js';

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

router
.route("/forget-password")
.post(forgetPassword)
export default router;