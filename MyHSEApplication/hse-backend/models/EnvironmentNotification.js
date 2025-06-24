
const mongoose = require('mongoose');

const environmentNotificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const EnvironmentNotification = mongoose.model('EnvironmentNotification', environmentNotificationSchema);

module.exports = EnvironmentNotification;
