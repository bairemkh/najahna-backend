import express from 'express';
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path";

import { profile, signin, signup,forgetPassword,resetPassword,verifyAccount,editProfile,changepassword,deleteaccount } from '../controllers/userController.js';

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
.route("/forget-password")
.post(forgetPassword)

router
.route("/reset-password")
.post(resetPassword)

router
.route("/verify-account")
.post(verifyAccount)

router
.route("/editprofile")
.put(protect,editProfile)

router
.route("/change-password")
.put(protect,changepassword);

router
.route("/delete-account")
.delete(protect,deleteaccount)



router
.route("/sendMail")
.get((req,res)=>{
    try{
        var from = "Najahni team"
    var to = "oueslatimohamed01@gmail.com"
    var subject = "Let's verify your account"

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
    })
    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
       /* html:{path: '../controllers/utils/templates'},
        context:{
            number: "2345"
        }*/
        html:
        "<h3>You have requested to reset your password</h3><p>Your reset code is : <b style='color : blue'> 4324</b></p>",
        
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
        res.send("mail sent")
    }
    catch(e){
        console.log(e);
        res.json({error:"Error"})
    }
})

export default router;

