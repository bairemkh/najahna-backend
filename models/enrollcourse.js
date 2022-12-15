import mongoose from "mongoose";
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
        }
    }
);
export default model('Enrollcourse',enrollcourseSchema);