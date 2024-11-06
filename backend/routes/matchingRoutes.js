const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Find roommate matches based on preferences
router.get('/find-matches', async (req, res) => {
  const { state, mess } = req.query;

  try {
    const matches = await User.find({ state, mess, matched: false });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error finding matches:', error);
    res.status(500).json({ message: 'Server error during match search.' });
  }
});

// Confirm a roommate match
router.post('/confirm-match', async (req, res) => {
  const { reg_no } = req.body;

  try {
    const user = await User.findOneAndUpdate({ reg_no }, { matched: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ message: 'Match confirmed successfully!' });
  } catch (error) {
    console.error('Error confirming match:', error);
    res.status(500).json({ message: 'Server error during match confirmation.' });
  }
});

module.exports = router;
