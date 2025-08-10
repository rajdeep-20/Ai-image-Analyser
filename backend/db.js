const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Logbook (MongoDB) Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to Logbook: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
