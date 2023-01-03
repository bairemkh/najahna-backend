import mongoose from "mongoose";
const { Schema, model} = mongoose;

const questionSchema = new Schema (
    {
        quizid:{
            type:Schema.Types.ObjectId,
            required: false,
        },
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
export default model('Question',questionSchema);