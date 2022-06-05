const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema({
  time: [String],
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Movies",
  },
});

const scheduleSchema = new Schema({
  city: { type: String, required: true },
  dayOfWeek: 0, // 0 - Niedziela --- 6 - Sobota
  movies: [moviesSchema],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
