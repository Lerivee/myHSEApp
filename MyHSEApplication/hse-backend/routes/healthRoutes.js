const express = require('express');
const router = express.Router();
const HealthReport = require('../models/healthReport');
const HealthNotification = require('../models/HealthNotification');

const authenticate = require('../middleware/authenticate');

router.get('/reports', authenticate, async (req, res) => {
    try {
        const reports = await HealthReport.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Failed to load health reports", error });
    }
});

router.post('/report', authenticate, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newReport = new HealthReport({ title, content });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: "Failed to create health report", error });
    }
});

router.get('/notifications', authenticate, async (req, res) => {
    try {
        const notifications = await HealthNotification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Failed to load health notifications", error });
    }
});


module.exports = router;
