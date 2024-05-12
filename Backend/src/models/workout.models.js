import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true
        },
        Reps:{
            type:Number,
        },
        Sets:{
            type:Number
        },
        image_url:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

export const Workout = mongoose.model("Workout", workoutSchema)