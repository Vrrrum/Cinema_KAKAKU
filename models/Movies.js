const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

module.exports = mongoose.model("Movies", moviesSchema);
