import mongoose from "mongoose";
const { Schema, model} = mongoose;

const quizSchema = new Schema (
    {
        courseid:{
            type: Schema.Types.ObjectId,
            required: true
        },
        questions:[{
            type:Schema.Types.ObjectId,
            ref: 'Question',
            required: false,
        }]
        
    }
);
export default model('Quiz',quizSchema);