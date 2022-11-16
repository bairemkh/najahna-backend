import mongoose from "mongoose";
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
        }

    },
    {
        timestamps: true
    }
);

export default model('Course',courseSchema);