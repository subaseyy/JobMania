require('dotenv').config(); // Load .env

const express = require('express');
const cors = require('cors'); // 

const connectDB = require('./configs/db.config'); // MongoDB connection function
const authRoutes = require('./routes/auth.routes'); // Your auth routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // ⬅️ allow frontend origin

app.use('/api/auth', authRoutes);



// Root route
app.get('/', (req, res) => {
  res.send('🚀 JobMania API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
