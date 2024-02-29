const mongoose = require('mongoose');

// Step 1: Define Mongoose schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

// Step 2: Create Mongoose model for User
const User = mongoose.model('User', userSchema);

// Step 3: Connect Mongoose to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Step 4: Implement addUserToDatabase function
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User(user);

    // Save the user to the database
    await newUser.save();

    // Log success message
    console.log('User added successfully!');
  } catch (error) {
    // Log error message if there's an issue
    console.error('Error adding user:', error.message);
  }
}

// Example usage
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
