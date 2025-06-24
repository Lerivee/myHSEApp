const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Health', 'Safety', 'Environment'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    relatedReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
