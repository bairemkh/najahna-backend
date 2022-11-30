import Course from "../models/course.js";
import Section from "../models/section.js"

export async function addSection (req,res) {
    const courseid = req.params.id;
    const coursefound = await Course.findById(courseid);
    if(!coursefound) {
        return res.status(404).json({error: "Course not found !"});
    }else {
        const section = await Section.create(req.body);
        section.courseid = courseid;
        await Course.findByIdAndUpdate({
            _id: courseid
        },
        {
            $push: {
                sections: section._id,
            },
        }
    )
        await section.save();
        return res.status(200).json({success : true});  
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