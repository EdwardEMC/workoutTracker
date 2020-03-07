const Workout = require("../models/workout.js");

// Below is an example of the api routes, check what data is being passed before continuing
module.exports = function(app) {
  app.get("/api/workout", (req, res) => {
      Workout.find({})
          .sort({ date: -1 })
          .then(dbWorkout => {
              res.json(dbWorkout);
          })
          .catch(err => {
              res.status(400).json(err);
          });
  });

  //workout is either cardio or resistance with different exercises add to them!!!
  app.post("/api/workout/:id", ({ body }, res) => {
      Workout.create(body)
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
  });
}