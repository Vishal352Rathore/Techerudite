require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin: '*', // Adjust this to your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Connect to MongoDB
connectDB();

// Use Routes
app.use('', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
