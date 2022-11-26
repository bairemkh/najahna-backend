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
        image: {
            type:String,
            required: false
        },
        isVerified:{
            type: Boolean,
        },
        role :{
            type: String,
            enum :['Student','Trainer'],
            default: 'Student'
        },
        otp: {
            type: String,
            required: false,
          },
        fields:{
            type: [String],
            enum: ['Science','Programming','Computing','Mechanics','Business','Soft skills','Language','Arts','Multimedia'],
            required: true
        },
        wallet:{
            type: Number,
            required: false,
        },
        file:{
            type:String,
            required:false
        }

    },
    {
        timestamps: true
    }
);

export default model('User',userSchema);