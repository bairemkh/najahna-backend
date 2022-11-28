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
            required: false
        },
        sectionid:{
            type: Schema.Types.ObjectId,
            required: false
        }
    }
);
export default model('Lesson',lessonSchema);