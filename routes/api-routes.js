const router = require("express").Router();
const Transaction = require("../models/workout.js");

// Below is an example of the api routes, check what data is being passed before continuing
// router.post("/api/transaction", ({ body }, res) => {
//     Transaction.create(body)
//       .then(dbTransaction => {
//         res.json(dbTransaction);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
// });


module.exports = router;