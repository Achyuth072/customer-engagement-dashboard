const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET api/users
// @desc    Get all users with optional filters
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      retentionCategory, 
      minEngagementScore, 
      maxEngagementScore,
      startDate,
      endDate 
    } = req.query;

    let query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by retention category
    if (retentionCategory) {
      query.predictedRetentionCategory = retentionCategory;
    }

    // Filter by engagement score range
    if (minEngagementScore !== undefined && maxEngagementScore !== undefined) {
      query.engagementScore = {
        $gte: Number(minEngagementScore),
        $lte: Number(maxEngagementScore)
      };
    }

    // Filter by date range
    if (startDate && endDate) {
      query.lastLoginDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create new user
    const user = new User({
      name,
      email,
      lastLoginDate: new Date(),
      engagementScore: 0, // Default score for new users
      predictedRetentionCategory: 'Medium' // Default category
    });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
