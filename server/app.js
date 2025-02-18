const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database');
const users = require('./routes/users');
const metrics = require('./routes/metrics');
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', users);
app.use('/api/metrics', metrics);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
