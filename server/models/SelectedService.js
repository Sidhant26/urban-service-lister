const mongoose = require('mongoose');

const selectedServiceSchema = new mongoose.Schema({
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    service_name: String,
    service_cost: Number,
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
});

module.exports = mongoose.model('SelectedService', selectedServiceSchema);