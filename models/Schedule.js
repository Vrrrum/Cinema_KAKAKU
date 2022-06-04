const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  city: { type: String, required: true },
  dayOfWeek: 0, // 0 - Niedziela --- 6 - Sobota
  movies: {
    0: {
      time: { type: String, required: true },
      movieId: { type: mongoose.Types.ObjectId, required: true },
    },
    1: {
      time: { type: String, required: true },
      movieId: { type: mongoose.Types.ObjectId, required: true },
    },
    2: {
      time: { type: String, required: true },
      movieId: { type: mongoose.Types.ObjectId, required: true },
    },
    3: {
      time: { type: String, required: true },
      movieId: { type: mongoose.Types.ObjectId, required: true },
    },
    4: {
      time: { type: String, required: true },
      movieId: { type: mongoose.Types.ObjectId, required: true },
    },
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
