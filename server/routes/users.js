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
      lastLoginDate
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

    // Filter by last login date using string comparison
    if (lastLoginDate) {
      console.log('Backend - Filtering by date:', lastLoginDate);
      
      // Use $expr to compare date portions
      query.$expr = {
        $eq: [
          { $substr: ['$lastLoginDate', 0, 10] }, // Get YYYY-MM-DD part
          lastLoginDate
        ]
      };

      console.log('Backend - Query:', JSON.stringify(query, null, 2));

      // Log matched documents for debugging
      const testQuery = await User.find(query);
      console.log('Backend - Matched users:', testQuery.map(doc => ({
        name: doc.name,
        lastLoginDate: doc.lastLoginDate,
        datePart: doc.lastLoginDate.substring(0, 10)
      })));
    }
    
    console.log('Backend - Final query:', JSON.stringify(query, null, 2));

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
