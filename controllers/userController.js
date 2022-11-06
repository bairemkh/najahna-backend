import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isAuth } from "../middleware/isAuth.js";
//import isAuth from "../middleware/isAuth.js";

export async function signup  (req,res) {
    const {email, password} = req.body;
    const userfound =  await User.findOne({"email": email});
    
    if(userfound) {
        return res.status(403).json({error: "user is already exist !"});
    } else {
        const user = await User.create(req.body)
        const hash = await bcrypt.hash(password,10);
        user.password = hash;
        await user.save();
        return res.status(200).json({success : true});    
    }
    
}

export async function signin (req,res) {
    const {email,password} =  req.body;
    const user = await User.findOne({"email": email});
    if(!user){
        return res.status(403).json({error: "user not found"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(403).json({error : "password failed"})
    }

    const payload = {id:user.id};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({success: true , data: token});
}

export async function profile (req,res) {
    if(!req.user){
        return res.status('401').json({error: "You're not authenticated!"});
    }

    const user = await User.findById(req.user._id);

    res.status(200).json({data: user});
}