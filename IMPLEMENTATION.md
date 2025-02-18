# Customer Engagement Dashboard

## Tech Stack and App Structure

* **Frontend:** React.js (with Vite for fast development and optimized production builds)
  * **Why React:**  Component-based architecture is ideal for dashboards, large community support, and plenty of libraries for charting and UI elements.
  * **Charting Library:** Recharts (Good balance of ease of use and customization)
  * **UI Library:**  Material UI (Provides pre-built, styled components for a consistent look and feel)
* **Backend:** Node.js with Express.js
  * **Why Node/Express:**  Fast, efficient, and JavaScript-based, allowing for full-stack JavaScript development.  Easy to create RESTful APIs.
* **Database:** MongoDB (using Mongoose for object modeling)
  * **Why MongoDB:**  Flexible schema, good for storing user activity logs and engagement data, scales well.  Easy to integrate with Node.js. Use a local MongoDB instance for development.
* **App Structure:**

    ```bash
    customer-engagement-dashboard/
    ├── client/             (Frontend - React)
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── DashboardOverview.js
    │   │   │   ├── UserActivityTable.js
    │   │   │   ├── AIInsightsPanel.js
    │   │   │   ├── FiltersAndSearch.js
    │   │   │   ├── Charts/ (Recharts components)
    │   │   │   └── ...
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   ├── services/  (API calls to backend)
    │   │   │   └── api.js
    │   │   └── ...
    ├── server/             (Backend - Node/Express)
    │   ├── models/
    │   │   ├── User.js
    │   │   └── ActivityLog.js
    │   ├── routes/
    │   │   ├── users.js
    │   │   └── metrics.js
    │   ├── data/          (For initial mock data)
    │   │   ├── users.json
    │   │   └── activity.json
    │   ├── config/
    │   │    └── database.js
    │   ├── app.js         (Main server file)
    │   └── ...
    ├── .gitignore
    ├── package.json      (For both frontend and backend - using concurrently)
    ├── README.md
    └── ...
    ```

## Implementation Plan (Daily Breakdown)

* **Day 1: Project Setup and Environment**

    1. **Initialize Projects:**
        * Create a new GitHub repository: [GitHub Repository Link](https://github.com/yourusername/customer-engagement-dashboard)  (Replace `yourusername` with your actual GitHub username.  This will be a public repository.)
        * Create the main project directory: `customer-engagement-dashboard`
        * Inside, initialize the frontend: `npm create vite@latest client --template react`
        * Inside, initialize the backend: `mkdir server && cd server && npm init -y`
        * Install necessary backend packages: `npm install express mongoose cors dotenv`
        * Install `concurrently` in the root directory: `npm install concurrently --save-dev` (To run frontend and backend simultaneously)
        * Install frontend packages in the `client` directory:
          * After project creation: `cd client && npm install`
          * Then install dependencies: `npm install @mui/material @emotion/react @emotion/styled recharts axios`
    2. **Basic Folder Structure:** Create the folder structure outlined above.
    3. **Backend Setup (app.js):**
        * Create a basic Express server in `server/app.js`.
        * Set up CORS to allow requests from the frontend.
        * Add a simple "Hello World" route to test the server.

        ```javascript
        // server/app.js
        const express = require('express');
        const cors = require('cors');
        const app = express();
        const port = process.env.PORT || 5000;

        app.use(cors());
        app.use(express.json());

        app.get('/', (req, res) => {
          res.send('Hello from the backend!');
        });

        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
        ```

    4. **Frontend Setup (App.js):**
        * Modify `client/src/App.js` to make a simple request to the backend.

        ```javascript
        // client/src/App.js
        import React, { useEffect, useState } from 'react';
        import './App.css';

        function App() {
          const [message, setMessage] = useState('');

          useEffect(() => {
            fetch('http://localhost:5000/')
              .then(response => response.text())
              .then(data => setMessage(data))
              .catch(error => console.error('Error fetching data:', error));
          }, []);

          return (
            <div className="App">
              <h1>Customer Engagement Dashboard</h1>
              <p>Backend says: {message}</p>
            </div>
          );
        }

        export default App;
        ```

    5. **Run Simultaneously:**
        * Add scripts to the root `package.json` to run both servers:

        ```json
        "scripts": {
          "start": "concurrently \"npm run server\" \"npm run client\"",
          "server": "node server/app.js",
          "client": "npm run dev --prefix client"
        },
        ```

  * Run `npm start` in the root directory. You should see both the Vite development server and the Express server running.
    6. **Commit to GitHub.**

* **Day 2: Database and Models**

    1. **MongoDB Setup:**
        * Create a local MongoDB database (e.g., `engagement_db`).  You can use MongoDB Compass or the command line.
        * Create a `server/config/database.js` file to connect to the database.

        ```javascript
        // server/config/database.js
        const mongoose = require('mongoose');

        const connectDB = async () => {
          try {
            await mongoose.connect('mongodb://localhost:27017/engagement_db', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log('MongoDB Connected...');
          } catch (err) {
            console.error(err.message);
            process.exit(1);
          }
        };

        module.exports = connectDB;
        ```

        * Call `connectDB()` in `server/app.js`.
    2. **User Model (server/models/User.js):**

        ```javascript
        // server/models/User.js
        const mongoose = require('mongoose');

        const UserSchema = new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          lastLoginDate: { type: Date },
          engagementScore: { type: Number, default: 0 },
          predictedRetentionCategory: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }
        });

        module.exports = mongoose.model('User', UserSchema);
        ```

    3. **ActivityLog Model (server/models/ActivityLog.js):**

        ```javascript
        // server/models/ActivityLog.js
        const mongoose = require('mongoose');

        const ActivityLogSchema = new mongoose.Schema({
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          action: { type: String, required: true }, // e.g., 'login', 'feature_used', 'page_viewed'
          timestamp: { type: Date, default: Date.now }
        });

        module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
        ```

    4. **Mock Data (server/data/):**
        * Create `users.json` and `activity.json` with some sample data.  This will be used to seed the database initially.

        ```json
        // server/data/users.json
        [
          { "name": "Alice Smith", "email": "alice@example.com", "lastLoginDate": "2024-01-15T12:00:00Z", "engagementScore": 85, "predictedRetentionCategory": "High" },
          { "name": "Bob Johnson", "email": "bob@example.com", "lastLoginDate": "2024-01-20T18:30:00Z", "engagementScore": 40, "predictedRetentionCategory": "Medium" },
          { "name": "Charlie Brown", "email": "charlie@example.com", "lastLoginDate": "2023-12-25T09:00:00Z", "engagementScore": 15, "predictedRetentionCategory": "Low" }
        ]

        // server/data/activity.json
        [
          { "userId": "placeholder_id_1", "action": "login", "timestamp": "2024-01-15T12:00:00Z" },
          { "userId": "placeholder_id_1", "action": "feature_used", "timestamp": "2024-01-15T12:30:00Z" },
          { "userId": "placeholder_id_2", "action": "login", "timestamp": "2024-01-20T18:30:00Z" }
        ]
        ```

        * Create a script (e.g., `server/seed.js`) to load this data into the database.  You'll need to replace `"placeholder_id_1"` etc. with actual ObjectIds after the users are created.
    5. **Commit to GitHub.**

* **Day 3: Backend Routes and Basic API**

    1. **User Routes (server/routes/users.js):**
        * Create routes to:
            * Get all users (`GET /api/users`)
            * Get a single user by ID (`GET /api/users/:id`)
            * (Optional, for later) Add a new user (`POST /api/users`)

        ```javascript
        // server/routes/users.js
        const express = require('express');
        const router = express.Router();
        const User = require('../models/User');

        // @route   GET api/users
        // @desc    Get all users
        router.get('/', async (req, res) => {
          try {
            const users = await User.find();
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
            res.status(500).send('Server Error');
          }
        });

        module.exports = router;
        ```

    2. **Metrics Routes (server/routes/metrics.js):**
        * Create placeholder routes for:
            * Getting active users (daily, weekly, monthly) -  (`GET /api/metrics/active-users`) - Return mock data for now.
            * Getting the engagement score - (`GET /api/metrics/engagement-score`) - Return a mock score for now.
            * Getting the retention rate - (`GET /api/metrics/retention-rate`) - Return a mock rate for now.
            * Getting churn predictions - (`GET /api/metrics/churn-predictions`) - Return mock predictions for now.

        ```javascript
        // server/routes/metrics.js (Placeholder - Mock Data)
        const express = require('express');
        const router = express.Router();

        router.get('/active-users', (req, res) => {
          res.json({ daily: 100, weekly: 600, monthly: 2000 });
        });

        router.get('/engagement-score', (req, res) => {
          res.json({ engagementScore: 75 }); // Mock score
        });

        router.get('/retention-rate', (req, res) => {
          res.json({ retentionRate: 0.65 }); // Mock rate (65%)
        });
        router.get('/churn-predictions', (req, res) => {
          res.json([
            { userId: 'user_id_1', predictedChurn: 0.2 },
            { userId: 'user_id_2', predictedChurn: 0.8 },
          ]);
        });

        module.exports = router;
        ```

    3. **Integrate Routes in app.js:**
        * Import and use the routes in `server/app.js`.

        ```javascript
        // server/app.js (Updated)
        // ... (previous code)
        const users = require('./routes/users');
        const metrics = require('./routes/metrics');

        // ... (previous code)

        app.use('/api/users', users);
        app.use('/api/metrics', metrics);

        // ... (previous code)
        ```

    4. **Test API Endpoints:** Use a tool like Postman or Thunder Client (VS Code extension) to test the API endpoints you've created.
    5. **Commit to GitHub.**

* **Day 4: Frontend - Dashboard Overview and Components**

    1. **API Service (client/src/services/api.js):**
        * Create functions to make API calls to the backend using `axios`.

        ```javascript
        // client/src/services/api.js
        import axios from 'axios';

        const API_URL = 'http://localhost:5000/api';

        export const getUsers = async () => {
          try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
          } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
          }
        };

        export const getMetrics = async (metricType) => {
          try {
            const response = await axios.get(`${API_URL}/metrics/${metricType}`);
            return response.data;
          } catch (error) {
            console.error(`Error fetching ${metricType}:`, error);
            throw error;
          }
        };

        // Add more functions for other API calls as needed
        ```

    2. **DashboardOverview Component (client/src/components/DashboardOverview.js):**
        * Fetch data from the `/api/metrics` endpoints (active users, engagement score, retention rate).
        * Display the metrics using Material UI components (e.g., `Typography`, `Card`, `Grid`).
        * Use placeholder data or loading indicators while fetching.

        ```javascript
        //client/src/components/DashboardOverview.js

        import React, { useState, useEffect } from 'react';
        import { Typography, Card, CardContent, Grid } from '@mui/material';
        import { getMetrics } from '../services/api';

        const DashboardOverview = () => {
          const [activeUsers, setActiveUsers] = useState({ daily: 0, weekly: 0, monthly: 0 });
          const [engagementScore, setEngagementScore] = useState(0);
          const [retentionRate, setRetentionRate] = useState(0);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            const fetchData = async () => {
              try {
                const activeUsersData = await getMetrics('active-users');
                setActiveUsers(activeUsersData);

                const engagementScoreData = await getMetrics('engagement-score');
                setEngagementScore(engagementScoreData.engagementScore);

                const retentionRateData = await getMetrics('retention-rate');
                setRetentionRate(retentionRateData.retentionRate);

                setLoading(false);
              } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false); // Ensure loading is set to false even on error
              }
            };

            fetchData();
          }, []);

          if (loading) {
            return <Typography>Loading...</Typography>;
          }

          return (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Active Users</Typography>
                    <Typography>Daily: {activeUsers.daily}</Typography>
                    <Typography>Weekly: {activeUsers.weekly}</Typography>
                    <Typography>Monthly: {activeUsers.monthly}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Engagement Score</Typography>
                    <Typography>{engagementScore}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Retention Rate</Typography>
                    <Typography>{(retentionRate * 100).toFixed(2)}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        };

        export default DashboardOverview;
        ```

    3. **UserActivityTable Component (client/src/components/UserActivityTable.js):**
        * Fetch data from the `/api/users` endpoint.
        * Display the user data in a Material UI `Table`.
        * Include columns for Name, Email, Last Login Date, Engagement Score, and Predicted Retention Category.

        ```javascript
        //client/src/components/UserActivityTable.js
        import React, { useState, useEffect } from 'react';
        import {
          Table,
          TableBody,
          TableCell,
          TableContainer,
          TableHead,
          TableRow,
          Paper,
        } from '@mui/material';
        import { getUsers } from '../services/api';

        const UserActivityTable = () => {
          const [users, setUsers] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            const fetchData = async () => {
              try {
                const usersData = await getUsers();
                setUsers(usersData);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
              }
            };

            fetchData();
          }, []);

          if (loading) {
            return <p>Loading...</p>;
          }

          return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Last Login Date</TableCell>
                    <TableCell>Engagement Score</TableCell>
                    <TableCell>Predicted Retention Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.lastLoginDate}</TableCell>
                      <TableCell>{user.engagementScore}</TableCell>
                      <TableCell>{user.predictedRetentionCategory}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        };

        export default UserActivityTable;

        ```

    4. **Integrate Components into App.js:** Add `DashboardOverview` and `UserActivityTable` to `client/src/App.js`.
    5. **Commit to GitHub.**

* **Day 5: Frontend - Charts, AI Insights, and Filters**

    1. **Charts (client/src/components/Charts/):**
        * Create Recharts components for visualizing:
            * Active Users over time (Line Chart)
            * Engagement Score distribution (Bar Chart or Histogram)
            * Retention Rate over time (Line Chart)
            * For now, use mock data within the chart components themselves.  We'll connect them to the API later.

        ```javascript
        // client/src/components/Charts/ActiveUsersChart.js (Example)
        import React from 'react';
        import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

        const data = [
          { name: 'Jan', activeUsers: 400 },
          { name: 'Feb', activeUsers: 700 },
          { name: 'Mar', activeUsers: 550 },
          // ... more mock data
        ];

        const ActiveUsersChart = () => (
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
          </LineChart>
        );

        export default ActiveUsersChart;
        ```

    2. **AIInsightsPanel Component (client/src/components/AIInsightsPanel.js):**
        * Fetch data from the `/api/metrics/churn-predictions` endpoint.
        * Display mock AI-powered recommendations based on the fetched data.  Use Material UI components for presentation.

        ```javascript
        //client/src/components/AIInsightsPanel.js
        import React, { useState, useEffect } from 'react';
        import { Typography, List, ListItem, ListItemText } from '@mui/material';
        import { getMetrics } from '../services/api';

        const AIInsightsPanel = () => {
          const [churnPredictions, setChurnPredictions] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            const fetchData = async () => {
              try {
                const churnData = await getMetrics('churn-predictions');
                setChurnPredictions(churnData);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching churn predictions:', error);
                setLoading(false);
              }
            };

            fetchData();
          }, []);

          if (loading) {
            return <Typography>Loading AI Insights...</Typography>;
          }

          return (
            <div>
              <Typography variant="h6">AI-Powered Insights</Typography>
              <List>
                {/* Mock Recommendations - Replace with logic based on churnPredictions */}
                <ListItem>
                  <ListItemText primary="Offer discounts to users with low engagement scores." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Highlight most-used features to new users." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Send targeted emails to users in the 'Low' retention category." />
                </ListItem>
              </List>
            </div>
          );
        };

        export default AIInsightsPanel;

        ```

    3. **FiltersAndSearch Component (client/src/components/FiltersAndSearch.js):**
        * Create input fields for:
            * Date range (using Material UI `DatePicker`)
            * Engagement score range (using Material UI `Slider`)
            * Retention category (using Material UI `Select`)
            * Search (using Material UI `TextField`)
        * For now, just log the filter values to the console when they change.  We'll implement the actual filtering logic later.

        ```javascript
        //client/src/components/FiltersAndSearch.js
        import React, { useState } from 'react';
        import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';

        const FiltersAndSearch = () => {
          const [searchQuery, setSearchQuery] = useState('');
          const [retentionCategory, setRetentionCategory] = useState('');
          const [engagementScoreRange, setEngagementScoreRange] = useState([0, 100]); // Min and Max

          const handleSearchChange = (event) => {
            setSearchQuery(event.target.value);
            console.log('Search Query:', event.target.value); // Log for now
          };

          const handleRetentionCategoryChange = (event) => {
            setRetentionCategory(event.target.value);
            console.log('Retention Category:', event.target.value); // Log for now
          };

          const handleEngagementScoreChange = (event, newValue) => {
            setEngagementScoreRange(newValue);
            console.log('Engagement Score Range:', newValue); // Log for now
          };

          return (
            <div>
              <TextField
                label="Search by Name or Email"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: '10px' }}
              />

              <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: '10px' }}>
                <InputLabel id="retention-category-label">Retention Category</InputLabel>
                <Select
                  labelId="retention-category-label"
                  id="retention-category"
                  value={retentionCategory}
                  onChange={handleRetentionCategoryChange}
                  label="Retention Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>

              <div>
                <Typography id="engagement-score-slider" gutterBottom>
                  Engagement Score Range
                </Typography>
                <Slider
                  value={engagementScoreRange}
                  onChange={handleEngagementScoreChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="engagement-score-slider"
                  min={0}
                  max={100}
                />
              </div>
            </div>
          );
        };

        export default FiltersAndSearch;

        ```

    4. **Integrate Components into App.js:** Add the new components to `client/src/App.js`.
    5. **Commit to GitHub.**

* **Day 6:  Refine and Connect Remaining Pieces**

    1. **Connect Charts to API:**
        * Modify the chart components to fetch data from the backend instead of using mock data.  You'll need to create new API endpoints in `server/routes/metrics.js` to provide the data in the format required by the charts.  This might involve aggregating data from the `ActivityLog` collection.  For example:

        ```javascript
        // server/routes/metrics.js (Updated - Example for Active Users)
        router.get('/active-users-over-time', async (req, res) => {
          try {
            // Aggregate data from ActivityLog to get daily active users
            const data = await ActivityLog.aggregate([
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                  count: { $sum: 1 }
                }
              },
              { $sort: { _id: 1 } }
            ]);
            res.json(data);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
        });
        ```

        * Update the corresponding chart component to use this data.

        ```javascript
        // client/src/components/Charts/ActiveUsersChart.js (Updated)
        import React, { useState, useEffect } from 'react';
        import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
        import { getMetrics } from '../../services/api';

        const ActiveUsersChart = () => {
          const [data, setData] = useState([]);

          useEffect(() => {
            const fetchData = async () => {
              try {
                const chartData = await getMetrics('active-users-over-time');
                // Transform the data if necessary to match Recharts format
                const formattedData = chartData.map(item => ({
                  name: item._id,
                  activeUsers: item.count
                }));
                setData(formattedData);
              } catch (error) {
                console.error('Error fetching chart data:', error);
              }
            };

            fetchData();
          }, []);

          return (
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
            </LineChart>
          );
        };

        export default ActiveUsersChart;
        ```

    2. **Implement Filtering Logic:**
        * Modify the `UserActivityTable` component to use the filter values from the `FiltersAndSearch` component.  You'll need to:
            * Pass the filter values as props from `App.js` to `UserActivityTable`.
            * Modify the API call in `UserActivityTable` to include query parameters based on the filter values.
            * Update the backend routes (e.g., `/api/users`) to handle these query parameters and filter the data accordingly.

        ```javascript
        // server/routes/users.js (Updated - Example for Filtering)
        router.get('/', async (req, res) => {
          try {
            const { search, retentionCategory, minEngagementScore, maxEngagementScore } = req.query;
            let query = {};

            if (search) {
              query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
              ];
            }

            if (retentionCategory) {
              query.predictedRetentionCategory = retentionCategory;
            }

            if (minEngagementScore && maxEngagementScore) {
              query.engagementScore = { $gte: minEngagementScore, $lte: maxEngagementScore };
            }

            const users = await User.find(query);
            res.json(users);
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
        });
        ```

        ```javascript
        // client/src/App.js (Updated - Passing Filter Props)
        // ... (import statements)
        import DashboardOverview from './components/DashboardOverview';
        import UserActivityTable from './components/UserActivityTable';
        import AIInsightsPanel from './components/AIInsightsPanel';
        import FiltersAndSearch from './components/FiltersAndSearch';

        function App() {
          const [filters, setFilters] = useState({
            search: '',
            retentionCategory: '',
            minEngagementScore: 0,
            maxEngagementScore: 100
          });

          const handleFilterChange = (newFilters) => {
            setFilters(newFilters);
          };

          return (
            <div className="App">
              <h1>Customer Engagement Dashboard</h1>
              <FiltersAndSearch onFilterChange={handleFilterChange} />
              <DashboardOverview />
              <UserActivityTable filters={filters} />
              <AIInsightsPanel />
            </div>
          );
        }

        export default App;

        ```

        ```javascript
        // client/src/components/UserActivityTable.js (Updated - Using Filters)
        // ... (import statements)

        const UserActivityTable = ({ filters }) => { // Receive filters as props
          const [users, setUsers] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            const fetchData = async () => {
              try {
                // Construct the query string based on filters
                const queryString = `?search=${filters.search}&retentionCategory=${filters.retentionCategory}&minEngagementScore=${filters.minEngagementScore}&maxEngagementScore=${filters.maxEngagementScore}`;
                const usersData = await getUsers(queryString); // Pass query string to getUsers
                setUsers(usersData);
                setLoading(false);
              } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
              }
            };

            fetchData();
          }, [filters]); // Re-fetch data when filters change

          // ... (rest of the component)
        };

        export default UserActivityTable;

        ```

        ```javascript
        //client/src/services/api.js
        export const getUsers = async (queryString = '') => {
          try {
            const response = await axios.get(`${API_URL}/users${queryString}`);
            return response.data;
          } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
          }
        };
        ```

    3. **Responsive Design:**
        * Use Material UI's `Grid` component and breakpoints (`xs`, `sm`, `md`, `lg`, `xl`) to ensure the dashboard is responsive on different screen sizes.
        * Test the layout on various devices and adjust as needed.
    4. **Commit to GitHub.**

* **Day 7: Documentation, Demo Video, and Submission (SATURDAY Deadline)**

    1. **README.md (Completion):**
        * Finalize the `README.md` file. Ensure it's comprehensive and well-formatted.
        * Include a link to the Demo Video.
    2. **Documentation (Report - 2-3 pages):**
        * **Engagement Score Formula:**  Define the formula.  *This is crucial and needs to be done before Day 7*.  Example:

            ```bash
            Engagement Score = (w1 * LoginFrequency) + (w2 * FeatureUsage) + (w3 * TimeSpent)

            Where:
                * LoginFrequency:  Number of logins in the past week (or other period).
                * FeatureUsage:  Weighted sum of key feature usage (e.g.,  FeatureA * 0.5 + FeatureB * 0.3 + FeatureC * 0.2).  *Requires defining key features*.
                * TimeSpent:  Total time spent on the platform in the past week (in minutes).
                * w1, w2, w3:  Weights assigned to each component (e.g., w1 = 0.4, w2 = 0.4, w3 = 0.2).  *These weights should be justified*.

            Justification:  This formula combines frequency of use, breadth of feature usage, and depth of engagement (time spent).  The weights can be adjusted based on the specific product and what behaviors are most indicative of engagement.
            ```

        * **Churn Prediction Logic:**  Describe the logic.  *This also needs to be defined before Day 7*. Example:

            ```bash
            Churn Prediction:

            1.  Calculate a Churn Risk Score:
                Churn Risk Score = (1 - NormalizedEngagementScore) * (1 - NormalizedRetentionMetric) * RecentActivityDecline

                Where:
                    * NormalizedEngagementScore:  Engagement Score scaled to a 0-1 range.
                    * NormalizedRetentionMetric:  A metric like "days since last login" (inverted and normalized), or a rolling average of activity, also scaled to 0-1.
                    * RecentActivityDecline:  A factor (0-1) representing a significant drop in recent activity compared to a previous period (e.g., last week vs. the week before).  This could be based on a percentage decrease in logins or feature usage.

            2.  Categorize Users:
                * High Risk: Churn Risk Score > 0.7
                * Medium Risk: 0.3 < Churn Risk Score <= 0.7
                * Low Risk: Churn Risk Score <= 0.3

            Justification:  This approach combines engagement, retention, and recent activity trends.  A low engagement score, poor retention metrics, and a recent drop in activity all contribute to a higher churn risk.  The thresholds (0.7 and 0.3) can be adjusted based on historical data and observed churn rates.
            ```

        * **Research Findings:**
            * Summarize your research on engagement metrics and retention strategies.  Reference any tools or platforms you analyzed (HubSpot, Mixpanel, etc.).
            * Explain how your research influenced your design choices (e.g., "Inspired by Mixpanel's cohort analysis, I implemented a retention rate chart to track user retention over time.").
        * **Challenges Faced:**
            * Describe any technical or design challenges you encountered.  Be honest about limitations.
        * **Potential Improvements:**
            * Suggest ways to improve the dashboard in the future (e.g., "Implement a more sophisticated machine learning model for churn prediction," "Add user segmentation capabilities," "Integrate with a messaging platform to send automated notifications").
    3. **Demo Video (3-5 minutes):**
        * **Record a screencast** of the dashboard.
        * **Showcase all features:**
            * Dashboard Overview (metrics)
            * User Activity Table (with data)
            * AI Insights Panel (mock recommendations)
            * Filters and Search (demonstrate functionality)
            * Charts (explain what they show)
        * **Explain the logic:**
            * Briefly explain the engagement score formula.
            * Briefly explain the churn prediction logic.
        * **Keep it concise and focused.**
        * **Upload the video** to a platform like YouTube (unlisted or public) or Vimeo.  Add the link to the `README.md` and this document.  [Demo Video Link (Placeholder)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)  (This is a placeholder; replace it with your actual video link).
    4. **Final Code Review:**
        * Ensure your code is clean, well-commented, and follows best practices.
        * Remove any unnecessary code or console logs.
    5. **Submission:**
        * **Submit the Google Form:** [Form Submission Link](https://forms.gle/vAnsMtC6qbzG39DC8)
        * Include the link to your GitHub repository.
        * Include the link to your demo video.
        * Include this document (copy and paste the entire content).
        * **Submit BEFORE THE END OF DAY ON SATURDAY.**

* **Concurrent Research and Documentation (Throughout the Week)**

    This work should happen alongside the development, not just on Day 7.

    1. **Engagement Score Research:**
        * Read articles and documentation on engagement metrics.
        * Explore how different companies define and measure engagement.
        * Consider different factors that might contribute to engagement for the specific (hypothetical) product this dashboard is for.
    2. **Churn Prediction Research:**
        * Research different churn prediction techniques (statistical methods, machine learning models).
        * Understand the data requirements for different approaches.
        * Develop a simplified logic that can be implemented with mock data.
    3. **Retention Tools Research:**
        * Explore tools like HubSpot, Mixpanel, and others.
        * Identify features that are relevant to the dashboard.
        * Take notes on UI/UX best practices.
    4. **Document Design Choices:** As you make design decisions (e.g., choosing specific chart types, deciding on filter options), document *why* you made those choices. This will be valuable for the report.

**Key Improvements and Reminders:**

* **Saturday Deadline:** The submission deadline is Saturday, not Sunday.
* **Comprehensive Documentation:** The report is a significant deliverable.
* **Justified Formulas:** The engagement score and churn prediction logic must be clearly defined and justified.
* **Demo Video:** The video is crucial for showcasing the functionality and explaining your approach.
* **Concurrent Research:** Don't leave the research to the last minute.
