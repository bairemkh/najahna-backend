import Course from "../models/course.js";
import Quiz from "../models/quiz.js";
import Question from "../models/question.js";

export async function addquiz(req,res) {

    const courseid = req.params.id;
    const coursefound = await Course.findById(courseid);
    if(!coursefound) {
        return res.status(404).json({error: "Course not found !"});
    }
    if(coursefound.quiz!==undefined){
        return res.status(403).json({error: "Already have a quiz !"});
    }
    else {
        const quiz = await Quiz.create({
            courseid:courseid
        });
        await Course.findByIdAndUpdate({
            _id: courseid
        },
        {
            quiz:quiz._id
        }
    )
        await quiz.save();
        console.log(quiz);

        return res.status(200).json(quiz);  
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
        console.log(question);

        return res.status(200).json(question);  
    }
}