// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express application
const app = express();

// Define MongoDB connection string (replace with your connection string)
const mongoDBUri = 'mongodb://localhost/mydatabase';

/**
 * Establishes a connection to MongoDB using Mongoose
 */
function connectToMongoDB() {
  // Connect to MongoDB
  mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Get the default connection
  const db = mongoose.connection;

  // Handle connection errors
  db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

  // Log a success message when the connection is established
  db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
  });
}

// Call the connectToMongoDB function to establish the MongoDB connection
connectToMongoDB();

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
