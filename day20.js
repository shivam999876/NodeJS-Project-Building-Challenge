const express = require('express');
const router = express.Router();
const User = require('./models/User'); 

/**
 * Express route to calculate the average age of all users in MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function averageAgeOfUsers(req, res) {
  try {

    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);

    const averageAge = result.length > 0 ? result[0].averageAge : 0;

    res.json({ averageAge });
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

router.get('/average-age', averageAgeOfUsers);

module.exports = router;
