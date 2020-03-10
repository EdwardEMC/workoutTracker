const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useFindAndModify: false,
  family: 4
};

mongoose.connect(MONGODB_URI, options);

// routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port: http://localhost:${PORT} !`);
});