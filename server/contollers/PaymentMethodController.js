const PaymentMethod = require('../models/PaymentMethod');

exports.createPaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.create(req.body);
        res.status(201).json(paymentMethod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.json(paymentMethods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};