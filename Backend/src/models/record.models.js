import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        Record: [{
            date: {
                type: String,
                required: true
            },
            Stats: {
                Calories: {
                    type: Number,
                    default: 0
                },
                Minutes: {
                    type: Number,
                    default: 0
                },
                Workouts: {
                    type: Number,
                    default: 0
                }
            }
        }]
    }
)

export const Record=mongoose.model('record',recordSchema)