import mongoose from "mongoose";
const { Schema, model} = mongoose;

const messageSchema = new Schema (
    {
        
        msgContent :{
            type: String,
            required: true
        },
        senderid:{
            type: Schema.Types.ObjectId,
            required: true
        },
        receiverid:{
            type: Schema.Types.ObjectId,
            required: true
        }
    }
);
export default model('Message',messageSchema);