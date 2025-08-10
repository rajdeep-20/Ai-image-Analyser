const mongoose = require('mongoose');

const analysisLogSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    labels: {
        type: Array,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AnalysisLog', analysisLogSchema);
