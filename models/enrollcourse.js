import mongoose from "mongoose";
import { lessonSchema } from "./lesson.js";
const { Schema, model} = mongoose;

const enrollcourseSchema = new Schema (
    {
        courseid :{
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: false
        },
        userid :{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        progress:{
            type: Number,
            required: false,
            default: 0
        },
        lessonsterminated:[{
            type: Schema.Types.ObjectId,
            ref: 'Lesson',
            required: false
        }]
    }
);
export default model('Enrollcourse',enrollcourseSchema);