require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


const adminRoutes = require('./routes/adminRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/candidate', candidateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
