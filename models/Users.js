const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createDate: { type: Number, required: true, default: Date.now() },
});

module.exports = mongoose.model("User", usersSchema);
