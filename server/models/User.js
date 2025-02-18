const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  lastLoginDate: { 
    type: Date 
  },
  engagementScore: { 
    type: Number, 
    default: 0 
  },
  predictedRetentionCategory: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
  }
});

module.exports = mongoose.model('User', UserSchema);