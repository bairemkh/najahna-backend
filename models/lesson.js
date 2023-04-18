import mongoose from "mongoose";
const { Schema, model} = mongoose;

export const lessonSchema = new Schema (
    {
        title :{
            type: String,
            required: true
        },
        video :{
            type: String,
            required: false
        },
        duration:{
            type: Number,
            require: false
        }
    }
);
export default model('Lesson',lessonSchema);