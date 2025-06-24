const mongoose = require('mongoose');

const environmentReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const EnvironmentReport = mongoose.model('EnvironmentReport', environmentReportSchema);

module.exports = EnvironmentReport;
