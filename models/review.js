import mongoose from "mongoose";
const { Schema, model} = mongoose;

export const reviewSchema = mongoose.Schema(
    {
      ratingComp: { type: Number, required: true },
      ratingTrainer: { type: Number, required: true },
      ratingContent: { type: Number, required: true },
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        },
     },
    {
      timestamps: true,
    }
  )

 