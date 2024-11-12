import jwt from "jsonwebtoken";
import User from "../models/user.js"

export async function protect (req,res,next) {
    if(!req.headers.authorization){
        return res.status(302).json({success : false , message: "no auth"});
    }

    const token = req.headers.authorization.replace("Bearer","").trim();

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
       // const user = await User.findOne({"_id":decoded.id});
         const user = await User.findById(decoded.id);
         req.user = user;
         next();
    } catch (err) {
        res.status(302).json({success: false, message: "not logged in"});
    }
}

export function trainer (req,res,next) {
    try {
        if(req.user.role !== "Trainer") {
            return res.status(302).json({ success: false, message: "you're not trainer"});
        } 
       next();
    }
     catch (error) {
        res.status(302).json({success: false, message: error});
    }
}