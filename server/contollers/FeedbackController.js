const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};