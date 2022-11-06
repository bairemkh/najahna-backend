import express from 'express';
import { profile, signin, signup,forgetPassword,resetPassword,verifyAccount } from '../controllers/userController.js';
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

router
.route("/reset-password")
.post(resetPassword)

router
.route("/verify-account")
.post(verifyAccount)

export default router;