const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter the type of exercise"    
        },
        name: {
            type: String,
            trim: true,
            required: "Enter the name of the exercise"  
        },
        duration: {
            type: Number,
            trim: true
        },
        distance: { //only used for cardio so far
            type: Number,
            trim: true
        },
        weight: {
            type: Number,
            trim: true
        },
        reps: {
            type: Number,
            trim: true
        },
        sets: {
            type: Number,
            trim: true
        }
    }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;