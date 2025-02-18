const mongoose = require('mongoose');
const connectDB = require('./config/database');
const User = require('./models/User');
const ActivityLog = require('./models/ActivityLogs');
const users = require('./data/users.json');
const activities = require('./data/activity.json');

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await ActivityLog.deleteMany({});

    // Insert users and store their IDs
    const createdUsers = await User.insertMany(users);
    
    // Map placeholder IDs to actual user IDs
    const userIdMap = {
      'placeholder_id_1': createdUsers[0]._id,
      'placeholder_id_2': createdUsers[1]._id
    };

    // Replace placeholder IDs with actual user IDs in activities
    const activitiesWithRealIds = activities.map(activity => ({
      ...activity,
      userId: userIdMap[activity.userId]
    }));

    // Insert activities
    await ActivityLog.insertMany(activitiesWithRealIds);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();