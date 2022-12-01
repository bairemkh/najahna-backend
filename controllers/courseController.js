import Course from "../models/course.js";
import User from "../models/user.js";

export function createCourse (req, res) {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        fields: req.body.fields,
        level: req.body.level,
        isPaid: req.body.isPaid,
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        price: req.body.price,
        idowner: req.user._id
    })
    .then(newCourse => {
        res.status(200).json(newCourse);
    })
    .catch((err) => {
        res.status(500).json({error: err})
    })
}

export function getAllCourses (req,res) {
    Course.find({isArchived : false})
    .populate("idowner")
    .populate("sections")
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
    Course.find({idowner: req.user._id}).populate("idowner")
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
        if(user.courses.length == 0){
            user.courses.push(course._id);
            await user.save();
            return res.status(200).json({message : "you are enrolled one"})
        }else{
            try {
                user.courses.forEach(async element => {
                         if(element != course.id){
                             //console.log(element != course._id);
                             await User.findByIdAndUpdate({
                                 _id: user.id
                             },
                             {
                                 $push: {
                                     courses: course._id,
                                 },
                             }
                         )
                         await Course.findByIdAndUpdate(
                            {
                                _id: course.id
                            },
                            {
                                $push: {
                                    students: user._id,
                                },
                            }
                         )
                         
                        // await user.save()
                         return res.status(200).json({message : "you are enrolled"})
                         } else {
                             return res.status(403).json({message : "already exisit !!"})
                         }
                 
                     
                 });
            }catch(e) {
                res.status(500).json({Error:e});
            }

        }

    } catch(e){
        res.status(500).json({Error:e});
    }

}

export async function getMyCourseslist(req,res) {
    const user = await User.findById(req.user.id).populate({
        path: "courses",
        populate: {
           path: "idowner"
           //select: { body: 1 }
        }
     });
   // courses.populate("course")
  // const user = await courses.populate("courses");
   const mycourses = user.courses;

 res.status(200).json({courses : mycourses});
}
