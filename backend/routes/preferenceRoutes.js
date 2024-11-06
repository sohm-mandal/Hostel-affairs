const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Add user preferences
router.post('/add-preference', async (req, res) => {
  const { name, reg_no, phone, state, hobies, mess, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Update user preferences
    user.name = name;
    user.reg_no = reg_no;
    user.phone = phone;
    user.state = state;
    user.hobies = hobies;
    user.mess = mess;

    await user.save();
    res.status(200).json({ message: 'Preferences added successfully!' });
  } catch (error) {
    console.error('Error adding preferences:', error);
    res.status(500).json({ message: 'Server error during preference addition.' });
  }
});

module.exports = router;
