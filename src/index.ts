const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

const sampleRoutes = require('./routes/sample.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/samples', sampleRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Sample Tracking API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
