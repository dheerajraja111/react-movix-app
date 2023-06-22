// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dheerajraja111:Welcome123@cluster0.xji5feg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
