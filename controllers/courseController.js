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
    Course.find({isArchived : false}).populate("idowner")
    .then((courses) => {
        res.status(200).json({courses : courses});
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function getMyOwnerCourses (req,res) {
    Course.find({idowner: req.user._id})
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