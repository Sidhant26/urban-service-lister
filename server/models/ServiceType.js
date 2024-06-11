const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
    service_type_name: String
});

module.exports = mongoose.model('ServiceType', serviceTypeSchema);