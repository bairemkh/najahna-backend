import Lesson from "../models/lesson.js"

export function addlesson(req,res) {
    Lesson.create({
        title: req.body.title,
        video: `${req.protocol}://${req.get('host')}/vid/${req.file.filename}`,
    })
    .then(newCourse => {
        res.status(200).json(newCourse);
    })
    .catch((err) => {
        res.status(500).json({error: err})
    })
}