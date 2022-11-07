import express from 'express';
import { changepassword, deleteaccount, editProfile, profile, signin, signup } from '../controllers/userController.js';
import { protect, trainer } from '../middleware/autorization.js';
import multer from '../middleware/multer-config.js';

const router = express.Router();

router
.route("/signup")
.post(multer,signup)

router
.route("/signin")
.post(signin)

router
.route("/profile")
.get(protect,profile)

router
.route("/editprofile")
.put(protect,editProfile)

router
.route("/change-password")
.put(protect,changepassword);

router
.route("/delete-account")
.delete(protect,deleteaccount)

export default router;

