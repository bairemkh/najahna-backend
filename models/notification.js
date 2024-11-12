import mongoose from "mongoose";
const { Schema, model} = mongoose;

const NotifSchema = new Schema (
    {
        
        Content :{
            type: String,
            required: true
        },
        Title:{
            type: String,
            required: true
        }
        
    },
    {
        timestamps: true
    }
);
export default model('Notification',NotifSchema);