import Course from "../models/course.js";
import Quiz from "../models/quiz.js";

export async function addquiz(req,res) {

    const courseid = req.params.id;
    const coursefound = await Course.findById(courseid);
    if(!coursefound) {
        return res.status(404).json({error: "Course not found !"});
    }
    if(coursefound.quiz.length==0){
        return res.status(403).json({error: "Already have a quiz !"});
    }
    else {
        coursefound.quiz=req.body
        await coursefound.save();
        console.log(coursefound);

        return res.status(200).json(coursefound);  
    }
}

export async function addquestion(req,res) {

    const quizid = req.params.id;
    const quizfound = await Quiz.findById(quizid);
    if(!quizfound) {
        return res.status(404).json({error: "quiz not found !"});
    }
    else {
        const question = await Question.create(req.body);
        question.quizid = quizid;
        await Quiz.findByIdAndUpdate({
            _id: quizid
        },
        {
            $push: {
                questions: question._id,
            },
        }
    )
        await question.save();

        return res.status(200).json(question);  
    }
}