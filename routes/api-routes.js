const Workout = require("../models/workout.js");

// Below is an example of the api routes, check what data is being passed before continuing
module.exports = function(app) {
  app.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
  });

  //workout is either cardio or resistance with different exercises add to them!!!
  app.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  // adding the exercise to the workout
  app.put("/api/workouts/:id", (req, res) => {
    const body = req.body;
    Workout.update({_id: req.params.id}, {$push: {exercises: body}}, (err, data) => {
      if(err) {
        console.log(err);
      } else {
        res.json(data);
      }
    })
  });

  // find the range of workouts
  app.get("/api/workouts/range", (req, res) => {
    Workout.find({}) //add range in the parameters
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.status(400).json(err);
      });
  });
}