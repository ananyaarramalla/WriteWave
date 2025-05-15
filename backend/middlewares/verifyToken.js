const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15m' });
};

function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized access. Please login to continue" });
  }
  const token = bearerToken.split(' ')[1];
  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    // If token has expired
    if (err.name === 'TokenExpiredError') {
      // Refresh the token and attach the new token to the response headers
      const newToken = generateAccessToken({ /* Add necessary user data */ });
      res.set('Authorization', `Bearer ${newToken}`);
      next();
    } else {
      next(err);
    }
  }
}

module.exports = verifyToken;
