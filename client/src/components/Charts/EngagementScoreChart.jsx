import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Typography, Box, CircularProgress, useTheme } from '@mui/material';
import { getUsers } from '../../services/api.jsx';

const EngagementScoreChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        
        const scoreRanges = [
          { range: '0-20', count: 0, label: 'Very Low' },
          { range: '21-40', count: 0, label: 'Low' },
          { range: '41-60', count: 0, label: 'Medium' },
          { range: '61-80', count: 0, label: 'High' },
          { range: '81-100', count: 0, label: 'Very High' }
        ];

        users.forEach(user => {
          const score = user.engagementScore;
          if (score <= 20) scoreRanges[0].count++;
          else if (score <= 40) scoreRanges[1].count++;
          else if (score <= 60) scoreRanges[2].count++;
          else if (score <= 80) scoreRanges[3].count++;
          else scoreRanges[4].count++;
        });

        setData(scoreRanges);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching engagement score data:', error);
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
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          px: { xs: 1, sm: 0 }
        }}
      >
        Engagement Score Distribution
      </Typography>
      <Box sx={{
        width: '100%',
        height: { xs: 300, sm: 400 },
        px: { xs: 1, sm: 0 }
      }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
              ...(window.innerWidth >= 600 && {
                right: 30,
                left: 20
              })
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="range"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              label={{
                value: 'Number of Users',
                angle: -90,
                position: window.innerWidth >= 600 ? 'insideLeft' : 'outsideLeft',
                fill: theme.palette.text.secondary,
                style: {
                  fontSize: window.innerWidth >= 600 ? 12 : 10
                }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
              }}
              cursor={{ fill: theme.palette.action.hover }}
            />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
            <Bar
              dataKey="count"
              name="Users"
              fill={theme.palette.secondary.main}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default EngagementScoreChart;