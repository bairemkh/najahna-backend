import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema =  new Schema(
    {
        firstname :{
            type: String,
            required: true
        },
        lastname :{
            type: String,
            required: true
        },
        email :{
            type: String,
            required: true
        },
        password :{
            type: String,
            required: true
        },
        isVerified:{
            type: Boolean,
        },
        role :{
            type: String,
            enum :['student','trainer'],
            default: 'student'
        },
        fields:{
            type: [String],
            enum: ['Science','Programming','Computing','Mechanics','Business','Soft skills','Language','Arts','Multimedia'],
            required: true
        }

    },
    {
        timestamps: true
    }
);

export default model('User',userSchema);