import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

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
        const image =  await req.file.filename;
        user.password = hash;
        const otp=otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,digits:true,lowerCaseAlphabets:false })
        user.otp=otp;
        user.isVerified=false
        user.image =`${req.protocol}://${req.get('host')}/img/${image}`
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
    if(!user.isVerified){
        return res.status(401).json({error : "UnAuthorized",email:user.email}) 
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
//ta3ml otp jdid
export async function forgetPassword(req,res){
    const {email}=req.body;
    User.findOne({"email": email})
    .then(user=>{
        if(user==null){
            res.status(404).json({error:"Not Found"})                  
        }
            res.status(200).json({_id:user.id})
    })
    .catch(e=>{
        res.status(500).json({error:"Server error"})
    })

}
export async function resetPassword(req,res){
    try{const {id,otp}=req.body
    const user= await User.findById(id)
    if(otp===user.otp){
        const token=jwt.sign({_id:user.id,OTP:user.otp},process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24})
        res.status(200).json({_id:user.id,Token:token})
    }
    else{
        res.status(403).json({error:"Wrong code"})
    }
}    
    catch(e){
        res.status(500).json({error:e})
    }
}
export async function verifyAccount(req,res){
    try{
        const {otp,email}=req.body
    const user= await User.findOne({"email": email})
    if(otp===user.otp){
        const token=jwt.sign({_id:user.id,OTP:user.otp},process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24})
        user.isVerified=true
        await user.save()
        res.status(200).json({_id:user.id,Token:token})
    }
    }
    catch(e){
        res.status(500).json({Error:"Server error"})
    }
    

export function editProfile (req,res) {
    User.findOneAndUpdate(req.user._id,req.body)
    .then((u) => {
        res.status(200).json({ message: "updated"});
       /* User.findById(req.user._id)
        .then((u1) => {
            res.status(200).json(u1);
        })
        .catch((err) => {
            res.status(500).json({ error: err});
        });*/
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });


}