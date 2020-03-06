const router = require("express").Router();
const Workout = require("../models/workout.js");

// Below is an example of the api routes, check what data is being passed before continuing
// router.post("/api/workout", ({ body }, res) => {
//     Workout.create(body)
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
// });


module.exports = router;