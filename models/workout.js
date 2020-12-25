const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises: 
        [{
            type: {
                type: String,
                trim: true,
                required: "Choose a workout type"
            },
            name: {
                type: String,
                trim: true,
                required: "Choose an exercise type"
            },
            duration: {
                type: Number,
                required: "Enter a duration"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number            
            }
        }],
    
    totalDuration: {
        type: Number,
        default: 0
    }
})


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;