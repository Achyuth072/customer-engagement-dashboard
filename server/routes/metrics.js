const express = require('express');
const router = express.Router();

// @route   GET api/metrics/active-users
// @desc    Get active users count (daily, weekly, monthly)
router.get('/active-users', (req, res) => {
  // Mock data for active users
  res.json({
    daily: 100,    // Mock daily active users
    weekly: 600,   // Mock weekly active users
    monthly: 2000  // Mock monthly active users
  });
});

// @route   GET api/metrics/engagement-score
// @desc    Get overall engagement score
router.get('/engagement-score', (req, res) => {
  // Mock data for engagement score
  res.json({
    engagementScore: 75 // Mock score out of 100
  });
});

// @route   GET api/metrics/retention-rate
// @desc    Get user retention rate
router.get('/retention-rate', (req, res) => {
  // Mock data for retention rate
  res.json({
    retentionRate: 0.65 // Mock rate (65%)
  });
});

// @route   GET api/metrics/churn-predictions
// @desc    Get churn predictions for users
router.get('/churn-predictions', (req, res) => {
  // Mock data for churn predictions
  res.json([
    {
      userId: 'user_id_1',
      predictedChurn: 0.2,  // 20% chance of churning
      category: 'Low Risk'
    },
    {
      userId: 'user_id_2',
      predictedChurn: 0.8,  // 80% chance of churning
      category: 'High Risk'
    },
    {
      userId: 'user_id_3',
      predictedChurn: 0.5,  // 50% chance of churning
      category: 'Medium Risk'
    }
  ]);
});

module.exports = router;