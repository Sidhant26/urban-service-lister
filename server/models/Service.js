const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    service_name: String,
    service_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' },
    Price: Number
});

module.exports = mongoose.model('Service', serviceSchema);