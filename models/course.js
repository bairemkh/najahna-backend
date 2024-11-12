import mongoose, { SchemaType } from "mongoose";
import { reviewSchema } from "./review.js";
import { quizSchema } from "./quiz.js";
import { sectionSchema } from "./section.js";
const { Schema, model} = mongoose;

const courseSchema =  new Schema(
    {
        title :{
            type: String,
            required: true
        },
        fields:{
            type: [String],
            enum: ['Science','Programming','Computing','Mechanics','Business','Soft skills','Language','Arts','Multimedia'],
            required: false
        },
        level :{
            type: String,
            enum: ["Beginner","Amateur","Advanced"],
            required: true
        },
        description :{
            type: String,
            required: true
        },
        isPaid :{
            type: Boolean,
            required: false
        },
        image: {
            type:String,
            required: false
        },
        price: {
            type:Number,
            required: false
        },
        idowner:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        isArchived:{
            type: Boolean,
            required: false,
            default: false
        },
        lesson_number:{
            type: Number,
            required: false,
            default:0
        },
        sections: [{
            type:sectionSchema,
            required: false
        }],
        students: [{
            type:Schema.Types.ObjectId,
            ref: 'Course',
            required: false,
            default: []
        }],
        comments:[{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        reviews: [reviewSchema],
        rating:{
            type: Number, 
            required: true,
            default: 0 
        },
        quiz:{
            type: [quizSchema],
            required: false 
        }

    },
    {
        timestamps: true
    }
);

export default model('Course',courseSchema);