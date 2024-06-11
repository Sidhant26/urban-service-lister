const Gender = require('../models/Gender');

exports.createGender = async (req, res) => {
    try {
        const gender = await Gender.create(req.body);
        res.status(201).json(gender);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllGenders = async (req, res) => {
    try {
        const genders = await Gender.find();
        res.json(genders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};