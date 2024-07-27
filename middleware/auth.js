const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {


  // Retrieve the token from cookies

  const token = req.cookies.token;

  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
