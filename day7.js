/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
    // Get current timestamp
    const timestamp = new Date().toISOString();
  
    // Log the timestamp and HTTP method
    console.log(`${timestamp} - ${req.method} request received`);
  
    // Pass control to the next middleware or route handler
    next();
  }
  
  // Example of usage in an Express app:
  const express = require('express');
  const app = express();
  
  // Use the requestLoggerMiddleware for all incoming requests
  app.use(requestLoggerMiddleware);
  
  // Define your routes and other middleware below
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  