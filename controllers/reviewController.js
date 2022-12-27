import Course from "../models/course.js";
import User from "../models/user.js";

export async function addReviewCourse (req,res) {
    try {
        const { ratingComp, ratingTrainer, ratingContent } = req.body;
        const course = await Course.findById(req.params.id);
        const trainer = await User.findById(course.idowner);
        if (course) {
          const alreadyReviewed = course.reviews.find(
            (r) => r.user.toString() == req.user._id.toString()
          );
      
          if (alreadyReviewed) {
           return res.status(400).json({message: "Already reviewed"})
          }
      
          const review = {
            ratingComp: Number(ratingComp),
            ratingTrainer: Number(ratingTrainer),
            ratingContent: Number(ratingContent),
            user: req.user._id,
          }
      
          course.reviews.push(review);
          trainer.reviews.push(review);
      
          course.rating =
            course.reviews.reduce((acc, item) => ((item.ratingContent + item.ratingComp - 5) + acc), 0) /course.reviews.length
        
          trainer.rating =
            trainer.reviews.reduce((acc,item) => item.ratingTrainer + acc,0) / trainer.reviews.length;
      
          await course.save();
          await trainer.save();
          res.status(200).json({ message: 'Review added' })
        } else {
          res.status(404).json({message: "Course not found"})
        }
    } catch (error) {
        res.status(500).json({err: error})
    }
}