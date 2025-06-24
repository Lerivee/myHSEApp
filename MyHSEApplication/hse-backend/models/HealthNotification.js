const mongoose = require('mongoose');

const healthNotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const HealthNotification = mongoose.model('HealthNotification', healthNotificationSchema);

module.exports = HealthNotification;
