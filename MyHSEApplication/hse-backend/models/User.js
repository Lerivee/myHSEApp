const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    matriculationNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // Add any other fields like email, role, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
