import mongoose from "mongoose";
const { Schema, model} = mongoose;

export const quizSchema= new Schema (
    {
        question:{
            type:Schema.Types.String,
            required: true,
        },
        props:[{
            type:Schema.Types.String,
            required: false,
        }],
        correctIndex:{
            type:Schema.Types.Number,
            required: false,
        }
        
    }
);
export default model('Quiz',quizSchema);