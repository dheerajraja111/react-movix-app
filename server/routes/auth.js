const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
