const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },
});

const User = mongoose.model("User", userSchema);

/**

 * @param {Object} user - User object with properties username and email
 */
function addUserWithValidation(user) {
  const newUser = new User(user);

  newUser.save((error, savedUser) => {
    if (error) {
      if (error.errors && error.errors.email) {
        console.error(`Validation Error: ${error.errors.email.message}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
    } else {
      console.log(
        `User ${savedUser.username} with email ${savedUser.email} added successfully.`
      );
    }
  });
}

// Test case
addUserWithValidation({ username: "john_doe", email: "invalid-email" });
