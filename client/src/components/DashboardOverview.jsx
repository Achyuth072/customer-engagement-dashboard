import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Stack } from '@mui/material';
import { getMetrics } from '../services/api.jsx';

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
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Active Users
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body1">
              Daily: {activeUsers.daily}
            </Typography>
            <Typography variant="body1">
              Weekly: {activeUsers.weekly}
            </Typography>
            <Typography variant="body1">
              Monthly: {activeUsers.monthly}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Engagement Score
          </Typography>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4">
              {engagementScore}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Out of 100
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Retention Rate
          </Typography>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4">
              {(retentionRate * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Period
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DashboardOverview;
