const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  booking_date: Date,
  service_date: Date,
  payment_details_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
