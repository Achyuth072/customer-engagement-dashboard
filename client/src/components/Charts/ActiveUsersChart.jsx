import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Typography, Box, CircularProgress, useTheme } from '@mui/material';
import { getMetrics } from '../../services/api.jsx';

const ActiveUsersChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getMetrics('active-users-over-time');
        const formattedData = chartData.map(item => ({
          name: new Date(item._id).toLocaleDateString(),
          activeUsers: item.count
        }));
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching active users data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Active Users Over Time
      </Typography>
      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="name"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              label={{
                value: 'Active Users',
                angle: -90,
                position: 'insideLeft',
                fill: theme.palette.text.secondary
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Active Users"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4, fill: theme.palette.primary.main }}
              activeDot={{ r: 6, fill: theme.palette.primary.main }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default ActiveUsersChart;
