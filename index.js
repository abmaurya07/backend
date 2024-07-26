require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());


mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors({
    origin: process.env.CLIENT_URL, // Frontend URL
  credentials: true // Allow cookies to be sent and received
})); // Use CORS middleware
app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
