import Lesson from "../models/lesson.js"
import Section from "../models/section.js"

export async function addlesson(req,res) {

    const sectionid = req.params.id;
    const sectionfound = await Section.findById(sectionid);
    if(!sectionfound) {
        return res.status(404).json({error: "Section not found !"});
    }else {
        const lesson = await Lesson.create(req.body);
        lesson.video = `${req.protocol}://${req.get('host')}/vid/${req.file.filename}`;
        lesson.sectionid = sectionid;
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
        return res.status(200).json({success : true, lesson : lesson});  
    }
   /* Lesson.create({
        title: req.body.title,
        video: `${req.protocol}://${req.get('host')}/vid/${req.file.filename}`,
    })
    .then(newCourse => {
        res.status(200).json(newCourse);
    })
    .catch((err) => {
        res.status(500).json({error: err})
    })*/
}