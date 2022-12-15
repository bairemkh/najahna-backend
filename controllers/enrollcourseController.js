import Course from "../models/course.js";
import User from "../models/user.js";
import Enrollcourse from "../models/enrollcourse.js";

export async function enrollInCourse (req,res) {
    try {
        const user = await User.findOne({_id: req.user._id});
        const course = await Course.findOne({_id: req.params._id})

        if(user.courses.length == 0){
            user.courses.push(course._id);
            await user.save();
            const enrollcourse = await Enrollcourse.create({courseid: course._id,userid: user._id})
            enrollcourse.save();
            res.status(200).json({message: "Sucess"})
          // return res.status(200).json({message : "you are enrolled one"})
        } else {
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
                         const enrollcourse = await Enrollcourse.create({courseid: course._id,userid: user._id})
                         enrollcourse.save();
                        // res.status(200).json({message: "Sucess"})
                    return res.status(200).json({message : "you are enrolled"})
                }else{
                    return res.status(403).json({message : "already exisit !!"})
                }

            }


    } catch(e){
        res.status(500).json({Error:e});
    }

}

export async function getMycoursesEnrolled (req,res) {
       try{

        const enrollcourse = await Enrollcourse.find({userid: req.user._id}).populate({
            path: "courseid",
             populate: [{
                path: "idowner",
               
             },
                {path: "sections",
                populate: {
                    path: "lessons",  
                 },  
        }]

   
         })
    
     res.status(200).json({enrolled : enrollcourse});

       }catch(err){
        res.status(500).json({Error:e});
       }
    
}