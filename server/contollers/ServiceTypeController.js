const ServiceType = require('../models/ServiceType');

exports.createServiceType = async (req, res) => {
    try {
        const serviceType = await ServiceType.create(req.body);
        res.status(201).json(serviceType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await ServiceType.find();
        res.json(serviceTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};