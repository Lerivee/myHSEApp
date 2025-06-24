const express = require('express');
const router = express.Router();
const EnvironmentReport = require('../models/EnvironmentReport');
const EnvironmentNotification = require('../models/EnvironmentNotification');

const authenticate = require('../middleware/authenticate');

router.get('/reports', authenticate, async (req, res) => {
    try {
        const reports = await EnvironmentReport.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Failed to load environment reports", error });
    }
});

router.post('/report', authenticate, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newReport = new EnvironmentReport({ title, content });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: "Failed to create environment report", error });
    }
});

router.get('/notifications', authenticate, async (req, res) => {
    try {
        const notifications = await EnvironmentNotification.find();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Failed to load environment notifications", error });
    }
});


module.exports = router;
