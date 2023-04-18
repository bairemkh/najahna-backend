import mongoose from "mongoose";
import { lessonSchema } from "./lesson.js";
const { Schema, model} = mongoose;

const sectionSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        courseid:{
            type: Schema.Types.ObjectId,
            required: false
        },
        lessons: [{
            type:lessonSchema,
            required: false
        }]
    },
    {
        timestamps: true
    }
);
export default model('Section',sectionSchema);