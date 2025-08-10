const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const FormData = require('form-data');
require('dotenv').config(); // Loads .env file contents
const connectDB = require('./db');
const AnalysisLog = require('./models/AnalysisLog');

// Connect to the database
connectDB();

const app = express();
const PORT = 5000;

// Set up Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Define the ML service URL
const ML_SERVICE_URL = 'http://localhost:8001/process-image';

// Define the main /upload endpoint
app.post('/upload', async (req, res) => {
    console.log("Received an upload request...");

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file was uploaded.');
    }

    const imageFile = req.files.image;
    const form = new FormData();
    form.append('file', imageFile.data, imageFile.name);

    try {
        // 1. Send the image to the ML service
        console.log("Forwarding image to the ML service...");
        const mlResponse = await axios.post(ML_SERVICE_URL, form, {
            headers: { ...form.getHeaders() },
        });
        const analysisData = mlResponse.data;
        console.log("Received analysis from ML service.");

        // 2. Save the successful analysis to the database
        console.log("Saving analysis to Logbook...");
        const newLog = new AnalysisLog({
            filename: analysisData.filename,
            labels: analysisData.labels,
            caption: analysisData.caption,
        });
        await newLog.save();
        console.log("Successfully saved analysis to Logbook.");

        // 3. Send the analysis result back to the frontend client
        res.json(analysisData);

    } catch (error) {
        console.error("An error occurred during the upload process:", error.message);
        // Check if the error came from the ML service or was a different issue
        if (error.response) {
            // The request was made and the ML service responded with a status code
            // that falls out of the range of 2xx
            console.error('ML Service Error Data:', error.response.data);
            console.error('ML Service Error Status:', error.response.status);
        }
        res.status(500).send('Error processing the image.');
    }
});

// NEW: Endpoint to get all analysis logs
app.get('/logs', async (req, res) => {
    try {
        console.log("Fetching all logs from the Logbook...");
        const logs = await AnalysisLog.find({}).sort({ timestamp: -1 }); // Get all logs, newest first
        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error.message);
        res.status(500).send('Failed to retrieve logs.');
    }
});

// NEW: Endpoint to get the 5 most recent logs
app.get('/logs/recent', async (req, res) => {
    try {
        const recentLogs = await AnalysisLog.find({}).sort({ timestamp: -1 }).limit(5);
        res.json(recentLogs);
    } catch (error) {
        res.status(500).send('Failed to retrieve recent logs.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Main Kitchen (Backend) is running on http://localhost:${PORT}`);
});
