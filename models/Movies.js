const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  title: String,
  genre: String,
  description: String,
});

const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;