const express = require('express');
const app = express();
const port = 3000;

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    const name = req.query.name || 'Guest';
    res.send(`Hello, ${name}!`);
}

// Define the "/greet" route
app.get('/greet', greetHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
