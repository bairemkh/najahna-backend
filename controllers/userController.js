import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import { otpMail, verificationMail } from "./utils/mailer.js";
import { pdfconvertFunction } from "./utils/pdfGenerator.js";
import { qrCodeGen } from "./utils/qrCodeGenerator.js";



export async function signup  (req,res) {
    const {email, password} = req.body;
    const userfound =  await User.findOne({"email": email});
    
    if(userfound) {
        return res.status(403).json({error: "user is already exist !"});
    } else {
        const user = await User.create(req.body)
        const hash = await bcrypt.hash(password,10);
       // const image =  await req.file.filename;
        user.password = hash;
        const otp=otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,digits:true,lowerCaseAlphabets:false })
        user.otp=otp;
        user.isVerified=false
       // user.image =`${req.protocol}://${req.get('host')}/img/${image}`
        verificationMail(req,user);
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
    res.status(200).json({success: true , data: token,role: user.role});
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
            return                
        }
        if(!user.isVerified){
            res.status(401).json({error:"Not Authorized"})
            return
        }
            user.otp=otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,digits:true,lowerCaseAlphabets:false })
            otpMail(user)
            user.save();
            res.status(200).json({_id:user._id})
    })
    .catch(e=>{
        res.status(500).json({error:"Server error"})
    })

}
export async function resetPassword(req,res){
    try{const {id,otp}=req.body
    const user= await User.findById(id)
    if(otp===user.otp){
        const payload = {id:user.id};
        const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });
        res.status(200).json({success: true , data: token});
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
       // const {otp,email}=req.body
        const email = req.query.email;
    const user= await User.findOne({"email": email})
    console.log(user);
    if(user){
        const token=jwt.sign({_id:user.id,OTP:user.otp},process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24})
        user.isVerified=true
        await user.save()
        //res.status(200).json({_id:user.id,Token:token})
        res.sendFile('../view/index.html');
    }else{
        res.status(401).json({Error:"Wrong Otp"})
    }
    }
    catch(e){
        res.status(500).json({Error:"Server error"})
    }
}

export async function editProfileImage(req,res) {
    try{
        const user = await User.findById(req.user._id)
        const image =  await req.file.filename;
        user.image = `/img/${image}`;
        user.save();
        res.status(200).json({message : "image changed"});

    }catch(e){
        res.status(500).json({Error:"Server error"});
    }

}

export async function becomeTrainer(req,res) {
    try{
        const user = await User.findById(req.user._id)
        const file =  await req.file.filename;
        user.file = `/file/${file}`;
        user.role = "Trainer"
        user.save();
        res.status(200).json({message : "Badge uploaded"});

    }catch(e){
        res.status(500).json({Error:"Server error"});
    }

}

export async function editProfile (req,res) {
    try {
        const password = req.body.password;
        const user =  await User.findByIdAndUpdate(req.user._id,req.body);
        const hash = await bcrypt.hash(password,10);
        user.password = hash;
        await user.save();
        return res.status(200).json({message : "updated"});
    } catch(e){
        res.status(500).json({Error:"Server error"});
    }

  

  /*  User.findOneAndUpdate(req.user._id,req.body)
    .then((u) => {
        const password =  req.body.password;
        const hash = bcrypt.hash(password,10);    
        u.password = hash
        u.save()
        res.status(200).json({ message: u});
       /* User.findById(req.user._id)
        .then((u1) => {
            res.status(200).json(u1);
        })
        .catch((err) => {
            res.status(500).json({ error: err});
        });
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });*/
}

export async function changepassword (req,res) {
    const {password,newpassword} =  req.body;
    const user = await User.findOne(req.user._id)
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(403).json({error : "password failed"})
    }

    const hash = await bcrypt.hash(newpassword,10);
    user.password = hash;
    await user.save();

    res.status(200).json({message : "password updated"});

}

export async function deleteaccount (req,res) {
    try{
        await User.deleteOne(req.user._id);
    res.status(200).json({message : "account deleted"});
    }catch(e){
        res.status(500).json({Error:"Server error"});
    }
    
}

export async function signinwithgoogle (req,res) {
    try {
        const email = req.body.email;
        const userfound =  await User.findOne({email: email})
        if(userfound) {
            const payload = {id:userfound.id};
            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
            });
            res.status(200).json({token: token,role: userfound.role});
        } else {

            const user = await User.create(req.body);
            const payload = {id:user.id};
            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
            });
            await user.save();
            res.status(200).json({message: "connected with google account",token: token,role: user.role})
        }


    }catch(e){
        res.status(500).json({Error:e});
    }
}

export function pdffiletest(req,res){
    try {
        qrCodeGen();
        res.status(200).json({message: "created"});
    } catch (err) {
        res.status(500).json({error:err})
    }

}