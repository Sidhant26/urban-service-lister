const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    description: String,
    fb_datetime: Date,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
});

module.exports = mongoose.model('Feedback', feedbackSchema);