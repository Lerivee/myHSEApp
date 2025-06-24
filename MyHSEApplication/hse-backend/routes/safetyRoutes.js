const express = require('express');
const router = express.Router();
const SafetyNotification = require('../models/safetyNotification');

const authenticate = require('../middleware/authenticate');

router.get('/notifications', authenticate, async (req, res) => {
    try {
        const notifications = await SafetyNotification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Failed to load safety notifications", error });
    }
});


module.exports = router;
