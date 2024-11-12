import mongoose from "mongoose";
const { Schema, model} = mongoose;

const commentSchema = new Schema(
    {
    
        content: {
             type: String,
             required : true
            },
        userId : {
          type : Schema.Types.ObjectId,
          ref: "User"
        },
        courseId : {
          type : Schema.Types.ObjectId, 
          ref: "Course"
        },
    
      },
      {
        timestamps: true,
      }
)
export default model('Comment',commentSchema);