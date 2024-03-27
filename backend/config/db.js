const mongoose = require('mongoose');
const User = require('../models/users')

const dbConnect = async() => {
    try {
        mongoose.connect(process.env.MOMGODB_URL);
        console.log("Database connected successfully");

        
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = dbConnect;
