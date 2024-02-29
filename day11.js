const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token using the secret (replace 'your-secret-key' with your actual secret key)
    const decoded = jwt.verify(token, 'your-secret-key');

    // Attach the decoded user information to the request object for further use in the route handlers
    req.user = decoded;

    // Allow the request to proceed
    next();
  } catch (error) {
    // If the token is invalid, return a 401 Unauthorized status
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

// Apply the authentication middleware to all routes below this line
app.use(authenticationMiddleware);

// Your protected routes go here

app.get('/', (req, res) => {
  res.send('Welcome to the protected route!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
