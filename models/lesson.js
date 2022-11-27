import mongoose from "mongoose";
const { Schema, model} = mongoose;

const lessonSchema = new Schema (
    {
        title :{
            type: String,
            required: true
        },
        video :{
            type: String,
            required: true
        }
    }
);
export default model('Lesson',lessonSchema);