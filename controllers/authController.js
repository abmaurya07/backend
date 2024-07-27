const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // If not, create a new user
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, jwtRefreshSecret, { expiresIn: '7d' });

    res.status(201).json({ message: 'User created successfully', token, refreshToken });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {

  console.log('login called')
  try {
    const { username, password } = req.body;
    console.log('username:', username, 'password:', password)
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, jwtRefreshSecret, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', username: user.username, token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { token } = req.cookies.refreshToken; // Retrieve the refresh token from cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, jwtRefreshSecret);
    const newToken = jwt.sign({ id: payload.id }, jwtSecret, { expiresIn: '1h' });
    const user = await User.findById(payload.id).select('-password');
    res.status(200).json({ message: 'Token refreshed',username: user.username, token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized'});
  }
};
