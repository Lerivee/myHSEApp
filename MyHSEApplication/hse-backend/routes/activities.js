const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Notification = require('../models/Notification');

// API to get recent reports and notifications
router.get('/reports/recent', async (req, res) => {
  try {
    const recentReports = await Report.find({}).sort({ createdAt: -1 }).limit(5); // Fetch recent reports
    const recentNotifications = await Notification.find({}).sort({ createdAt: -1 }).limit(5); // Fetch recent notifications

    res.json({
      reports: recentReports,
      notifications: recentNotifications
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent activities' });
  }
});

module.exports = router;
