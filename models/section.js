import mongoose from "mongoose";
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
        }

    },
    {
        timestamps: true
    }
);
export default model('Section',sectionSchema);