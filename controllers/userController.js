import User from "../models/user.js";
import bcrypt from "bcryptjs";

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