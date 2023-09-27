const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts;
const getAllWorkouts = async(req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}

//get a single workout
const getWorkouts = async(req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "No such workout"})
    }
    const workouts = await Workout.findById(id);
    if(!workouts){
        return res.status(404).json({error: "No such workout"})
    }
    res.status(200).json(workouts);
}

//create new workout
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = [];

    if(!title){
      emptyFields.push("title")
    }
    if(!load){
      emptyFields.push("load")
    }
    if(!reps){
      emptyFields.push("reps")
    }
    if(emptyFields.length > 0){
      return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }
    //add doc to db
    try{
    const workout = await Workout.create({
        title, load, reps
    });
    res.status(200).json(workout);
}catch(error){
    res.status(404).json({error: error.message});
}
}

//update a workout
const updateworkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
  
    // Extract the fields you want to update from the request body
    const { title, load, rep} = req.body; // Replace with your actual field names
  
    try {
      const workout = await Workout.findOneAndUpdate(
        { _id: id },
        {
          field1: title,
          field2: load,
          field3: rep,
        },
        { new: true }
      );
  
      if (!workout) {
        return res.status(404).json({ error: "No such workout" });
      }
  
      res.status(200).json(workout);
    } catch (error) {
      // Handle any potential errors, e.g., database errors
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
//delete a workout

const deleteWorkout = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workouts = await Workout.findOneAndDelete({_id: id}, {...req.body});

    if (!workouts){
        return res.status(400).json({error: "No such workout"})
    }
    res.status(200).json({workouts})
}

module.exports = {createWorkout, getAllWorkouts, getWorkouts, deleteWorkout, updateworkout};