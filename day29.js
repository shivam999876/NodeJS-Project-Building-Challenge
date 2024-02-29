const express = require('express');
const app = express();

// Your other middleware and route handlers here

// Error handling middleware
function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err);

    // Check if the error is an instance of the built-in Error object
    if (err instanceof Error) {
        // Handle specific types of errors if needed
        if (err.name === 'ValidationError') {
            // Handle validation errors
            return res.status(400).json({ error: err.message });
        }

        // Handle other types of errors
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Handle non-Error type errors
    return res.status(500).json({ error: 'Internal Server Error' });
}

// Include the error handling middleware at the end
app.use(errorHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
