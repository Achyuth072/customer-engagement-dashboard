const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database');
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
