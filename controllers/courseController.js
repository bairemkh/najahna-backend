import Course from "../models/course.js";
import User from "../models/user.js";
import fetch from "node-fetch";
import { json } from "express";
export function createCourse (req, res) {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        fields: req.body.fields,
        level: req.body.level,
        isPaid: req.body.isPaid,
        image: `/img/${req.file.filename}`,
        price: req.body.price,
        idowner: req.user._id
    })
    .then(newCourse => {
        console.log(newCourse);
        res.status(200).json(newCourse);
    })
    .catch((err) => {
        res.status(500).json({error: err})
    })
}

export function getAllCourses (req,res) {
    Course.find({isArchived : false})
    .populate("idowner")
    .populate({
        path: "sections",
        populate: {
           path: "lessons"
           //select: { body: 1 }
        }
     })
     .populate({
        path: "comments",
        populate: {
           path: "userId"
           //select: { body: 1 }
        }
     })
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}
export function getCourseById (req,res) {
    const courseid = req.params.id;
    Course.find({_id:courseid,isArchived : false}).populate("sections")
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}
export function getCoursesByFields (req,res) {
    Course.find({fields: req.body.fields})
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function searchCourse(req,res) {
    const search = req.body.search;
    Course.find({title: { $regex: search, $options: "i" }})
    .then((courses) => {
        if(courses.length === 0){
            res.status(404).json({message : "Not found"});
        } else {
            
            res.status(200).json({courses : courses});
        }
        
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function getMyOwnerCourses (req,res) {
    Course.find({idowner: req.user._id,isArchived: false}).populate("idowner").populate({
        path: "sections",
        populate: {
           path: "lessons"
           //select: { body: 1 }
        }
     })
     .populate({
        path: "comments",
        populate: {
           path: "userId"
           //select: { body: 1 }
        }
     })
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

export function getMyOwnerCoursesArchived (req,res) {
    Course.find({idowner: req.user._id,isArchived: true}).populate("idowner")
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

export function updateMyCourses (req,res) {
    Course.findOneAndUpdate({_id : req.params._id,idowner:req.user._id},req.body)
    .then((c) => {
        res.status(200).json({ message: "course is updated !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}

export function archivedMyCourse (req,res) {
    const archived = req.body.archived;
    Course.findOneAndUpdate({_id : req.params._id,idowner:req.user._id},{isArchived: archived})
    .then((c) => {
        res.status(200).json({ message: "Course is archived !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}

export async function enrollInCourse (req,res) {
    try {
        const user = await User.findOne({_id: req.user._id});
        const course = await Course.findOne({_id: req.params._id})
        console.log("course === "+course._id)
        if(user.courses.length == 0){
            user.courses.push(course._id);
            await user.save();
           return res.status(200).json({message : "you are enrolled one"})
        }else
            {
                const x = user.courses.find(cou=>cou._id==req.params._id)
                console.log(x);
                if(x==undefined){
                     await User.findByIdAndUpdate({
                                 _id: user.id
                             },
                             {
                                 $push: {
                                     courses: course._id,
                                 },
                             }
                         )
                         await user.save()
                    return res.status(200).json({message : "you are enrolled"})
                }else{
                    return res.status(403).json({message : "already exisit !!"})
                }
                
               /* user.courses.forEach(async element => {
                         if(element != course.id){
                             //console.log(element != course._id);
                            
                         
                        await user.save()
                        return res.status(200).json({message : "you are enrolled"})
                         } else {
                            return res.status(403).json({message : "already exisit !!"})
                         }
                 
                     
                 });*/

            }

    } catch(e){
        res.status(500).json({Error:e});
    }

}

export async function getMyCourseslist(req,res) {
    const user = await User.findById(req.user.id).populate({
        path: "courses",
         populate: {
            path: "idowner",  
         },
         populate:{
            path:"sections"
         }    
     })
   // courses.populate("course")
  // const user = await courses.populate("courses");
   const mycourses = user.courses;

 res.status(200).json({courses : mycourses});
}


export async function initPayement(req,res) {
    try {
            const body = {
        "receiverWalletId": "6394718108ec811bcda333df",
        "description": "test api konnect",
        "amount": req.body.amount,
        "type": "immediate",
        "lifespan": 10,
        "token": "TND"
    };
    const response = await fetch('https://api.preprod.konnect.network/api/v2/payments/init-payment',
     {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {
            'x-api-key': '6394718108ec811bcda333de:BZlUxXLfwf8ksN3tmGSem5QeekFxQmw',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    
    console.log(data);
    res.status(response.status).json(data);
    }catch(err){
        res.status(500).json(err);
    }
}