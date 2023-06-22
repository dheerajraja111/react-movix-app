const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = 4002;

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
