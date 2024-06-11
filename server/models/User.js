const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email_id: { type: String, unique: true, required: true },
  phone_no: { type: Number, unique: true, required: true },
  address: String,
  isAdmin: { type: Boolean, default: false },
  profileImage: String,
  password: { type: String, required: true }, // New password field
});
const User = mongoose.model("User", userSchema);

module.exports = User;
