const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  login: String,
  email: String,
  password: String,
  tickets: 
});

const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;