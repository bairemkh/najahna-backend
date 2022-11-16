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
    Course.find().populate("idowner")
    .then((courses) => {
        res.status(200).json(courses);
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function getMyOwnerCourses (req,res) {
    Course.find({idowner: req.user._id})
    .then((courses) => {
        res.status(200).json(courses);
    })
    .catch((err) => {
        res.status(500).json({error : err})
    })
}