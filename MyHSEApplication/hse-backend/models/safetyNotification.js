const mongoose = require('mongoose');

const safetyNotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const SafetyNotification = mongoose.model('SafetyNotification', safetyNotificationSchema);

module.exports = SafetyNotification;
