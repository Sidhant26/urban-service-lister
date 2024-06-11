const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
    gender: String
});

module.exports = mongoose.model('Gender', genderSchema);