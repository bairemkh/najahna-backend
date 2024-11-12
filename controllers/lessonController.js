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
        const lesson = req.body;
        lesson.video = `/vid/${req.file.filename}`;
        lesson.duration = await getVideoDurationInSeconds("http://localhost:9090"+lesson.video);
          console.log(lesson.duration);
        await Section.findByIdAndUpdate({
            _id: sectionid
        },
        {
            $push: {
                lessons: lesson,
            },
        }
    )
        coursefound.lesson_number = coursefound.lesson_number + 1;
        console.log(coursefound);
        await coursefound.save();
        return res.status(200).json(lesson);  
    }
}
export async function saveLessonVideo(req,res) {    
        const lesson = req.body;
        lesson.video = `/vid/${req.file.filename}`;
        lesson.duration = await getVideoDurationInSeconds("http://localhost:9090"+lesson.video);
        console.log(lesson.duration);        
        return res.status(200).json(lesson);  
}

/*export function updateLesson (req,res) {
    Lesson.findOneAndUpdate({_id : req.params.id},req.body)
    .then((c) => {
        res.status(200).json({ message: "lesson is updated !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}*/
export function updateLesson(req,res) {
    const sectionId = req.params.sectionId;
    const lessonId = req.params.lessonId;
    const updatedLesson = {
        title: req.body.title,
        video: `/vid/${req.file.filename}`,
        duration: req.body.duration
    };
    Section.findOneAndUpdate(
        { _id: sectionId, 'lessons._id': lessonId },
        { $set: { 'lessons.$': updatedLesson } },
        { new: true },
        (err, section) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else if (!section) {
                res.status(404).send('Section or lesson not found');
            } else {
                const lesson = section.lessons.id(lessonId);
                console.log('Lesson updated:', lesson);
                res.status(200).json(lesson);
            }
        }
    );
}

export async function deleteLesson (req,res) {
    try{
        await Lesson.deleteOne(req.params.id);
    res.status(200).json({message : "lesson deleted"});
    }catch(e){
        res.status(500).json({Error:"Server error"});
    }
    
}
