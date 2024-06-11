const SelectedService = require('../models/SelectedService');

exports.createSelectedService = async (req, res) => {
    try {
        const selectedService = await SelectedService.create(req.body);
        res.status(201).json(selectedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllSelectedServices = async (req, res) => {
    try {
        const selectedServices = await SelectedService.find();
        res.json(selectedServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};