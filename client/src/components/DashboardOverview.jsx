import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Stack, useTheme } from '@mui/material';
import { getMetrics } from '../services/api.jsx';

const DashboardOverview = () => {
  const [activeUsers, setActiveUsers] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [engagementScore, setEngagementScore] = useState(0);
  const [retentionRate, setRetentionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    bgcolor: 'background.paper',
    '&:hover': {
      boxShadow: theme.shadows[4],
      transform: 'translateY(-2px)',
      transition: 'all 0.3s ease-in-out'
    }
  };

  const metricCardContent = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="h6" color="primary" gutterBottom>
            Active Users
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="h4" color="text.primary">
                {activeUsers.daily}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                {activeUsers.weekly}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Week
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary">
                {activeUsers.monthly}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Month
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Engagement Score
          </Typography>
          <Box sx={{ py: 2 }}>
            <Typography variant="h3" color="text.primary">
              {engagementScore}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Out of 100
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {engagementScore >= 70 ? 'Excellent' : 
             engagementScore >= 40 ? 'Good' : 'Needs Improvement'}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="h6" color="success.main" gutterBottom>
            Retention Rate
          </Typography>
          <Box sx={{ py: 2 }}>
            <Typography variant="h3" color="text.primary">
              {(retentionRate * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Period
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            color={retentionRate >= 0.8 ? 'success.main' : 
                   retentionRate >= 0.6 ? 'warning.main' : 'error.main'}
          >
            {retentionRate >= 0.8 ? 'Strong Retention' : 
             retentionRate >= 0.6 ? 'Average Retention' : 'At Risk'}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DashboardOverview;
