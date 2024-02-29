const cache = {};
/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const { method, url } = req;

  // Generate a unique cache key based on the request method and URL
  const cacheKey = `${method}-${url}`;

  // Check if the response is cached
  if (cache[cacheKey]) {
    // If cached, return the cached response
    console.log(`Cache hit for ${cacheKey}`);
    return res.send(cache[cacheKey]);
  }

  // If not cached, proceed with the request
  res.sendResponse = res.send;
  res.send = (body) => {
    // Cache the response and set the cache expiration time (e.g., 5 seconds)
    cache[cacheKey] = body;
    setTimeout(() => {
      // Remove the cache entry after expiration time
      console.log(`Cache expired for ${cacheKey}`);
      delete cache[cacheKey];
    }, 5000);

    // Call the original sendResponse method
    res.sendResponse(body);
  };

  // Continue with the request handling
  next();
}

// Example usage:
const express = require('express');
const app = express();

// Use the caching middleware
app.use(cachingMiddleware);

// Route with caching
app.get('/example', (req, res) => {
  res.send('This is a cached response');
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
