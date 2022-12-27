import Lesson from "../models/lesson.js"
import Section from "../models/section.js"
import Course from "../models/course.js"
import {getVideoDurationInSeconds} from "get-video-duration"

export async function addlesson(req,res) {

    const sectionid = req.params.id;
    const sectionfound = await Section.findById(sectionid);
    const coursefound = await Course.findById(sectionfound.courseid);
    if(!sectionfound) {
        return res.status(404).json({error: "Section not found !"});
    }else {
        const lesson = await Lesson.create(req.body);
        lesson.video = `/vid/${req.file.filename}`;
        lesson.sectionid = sectionid;
        lesson.duration = await getVideoDurationInSeconds("http://localhost:9090"+lesson.video);
          console.log(lesson.duration);
        await Section.findByIdAndUpdate({
            _id: sectionid
        },
        {
            $push: {
                lessons: lesson._id,
            },
        }
    )
        
        await lesson.save();
        coursefound.lesson_number = coursefound.lesson_number + 1;
        await coursefound.save();
        return res.status(200).json({success : true, lesson : lesson});  
    }
}

export function updateLesson (req,res) {
    Lesson.findOneAndUpdate({_id : req.params.id},req.body)
    .then((c) => {
        res.status(200).json({ message: "lesson is updated !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}

export async function deleteLesson (req,res) {
    try{
        await Lesson.deleteOne(req.params.id);
    res.status(200).json({message : "lesson deleted"});
    }catch(e){
        res.status(500).json({Error:"Server error"});
    }
    
}
