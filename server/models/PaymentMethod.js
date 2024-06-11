const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    payment_type: String
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);