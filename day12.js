const express = require('express');

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip; // Get the IP address of the client
  const rateLimit = 5; // Set the rate limit (requests per minute)
  const windowMs = 60000; // Set the time window in milliseconds (1 minute)

  // Initialize or get the IP's request count from the storage
  const requestCount = (ipRequestCounts[ip] || 0) + 1;

  // Update the request count for the IP
  ipRequestCounts[ip] = requestCount;

  // Set the time window for the IP
  if (!ipRequestTimestamps[ip]) {
    ipRequestTimestamps[ip] = Date.now();
  }

  // Check if the time window has passed; if yes, reset the request count and timestamp
  if (Date.now() - ipRequestTimestamps[ip] > windowMs) {
    ipRequestCounts[ip] = 1;
    ipRequestTimestamps[ip] = Date.now();
  }

  // Check if the request count exceeds the rate limit
  if (requestCount > rateLimit) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  // Allow the request to proceed
  next();
}

// In-memory storage for IP request counts and timestamps
const ipRequestCounts = {};
const ipRequestTimestamps = {};

// Create an Express application
const app = express();

// Use rate-limiting middleware
app.use(rateLimitMiddleware);

// Your routes go here

app.get('/', (req, res) => {
  res.send('Hello, this request is within the rate limit!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
