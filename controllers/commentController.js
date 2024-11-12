import Comment from "../models/comment.js";
import Course from "../models/course.js";

export async function addComment(req,res) {
try {
    const courseid = req.params.id;
    const coursefound = await Course.findById(courseid);
    if(!coursefound) {
        return res.status(404).json({error: "Course not found !"});
    }else {
        const comment = await Comment.create(req.body);
        comment.userId = req.user._id;
        comment.courseId = courseid
        await Course.findByIdAndUpdate({
            _id: courseid
        },
        {
            $push: {
                comments: comment._id,
            },
        }
    )
        await comment.save();
        return res.status(200).json({success : true, comment : comment});  
    }
} catch (error) {
    res.status(500).json({error: error});
}
}

export function getCommentByCourse (req,res){
    Comment.find({courseId: req.params.id}).populate({ path: 'userId', select: 'firstname lastname image' })
    .then((comments) => {
        res.status(200).json({comments : comments});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

