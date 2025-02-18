const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  action: { 
    type: String, 
    required: true 
  }, // e.g., 'login', 'feature_used', 'page_viewed'
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);