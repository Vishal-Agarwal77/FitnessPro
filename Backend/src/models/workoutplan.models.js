import mongoose from "mongoose";

const plan = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Reps: {
            type: Number,
        },
        Sets: {
            type: Number
        },
        image_url: {
            type: String,
            required: true
        },
        Status: {
            type: Boolean,
            default: false
        },
        Time_taken: {
            type: Number,
            default: 0
        },
        Intensity: {
            type: Number,
            default: 0
        }
    }
)

const workoutplanSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        Plan: [{
            date: {
                type: String,
                required: true
            },
            workout: [plan]
        }]
    }
)

export const WorkoutPlan = mongoose.model("workoutplan", workoutplanSchema)