import Course from "../models/course.js";
import Section from "../models/section.js"

export async function addSection (req,res) {
    const courseid = req.params.id;
    const coursefound = await Course.findById(courseid);
    if(!coursefound) {
        return res.status(404).json({error: "Course not found !"});
    }else {
        const section = req.body;
        section.courseid = courseid;
        await Course.findByIdAndUpdate({
            _id: courseid
        },
        {
            $push: {
                sections: section,
            },
        }
    )
        await section.save();
        return res.status(200).json(section);  
    }
}

export async function getSectionById (req,res) {
    const sectionid = req.params.id;
    Section.findById(sectionid).populate("lessons")
    .then((section) => {
        res.status(200).json({section : section});
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export async function editSection (req,res) {
    Section.findOneAndUpdate(req.params._id,req.body)
    .then((c) => {
        res.status(200).json({ message: "Section is updated !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}

export async function deleteSection (req,res) {
    try{
        await Section.deleteOne(req.section._id);
    res.status(200).json({message : "section deleted"});
    }catch(e){
        res.status(500).json({Error:"Server error"});
    }
}