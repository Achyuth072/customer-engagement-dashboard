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
    '& .MuiCardContent-root': {
      p: 2,
      '&:last-child': {
        pb: 2
      }
    },
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
    gap: 0.5
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        width: '100%',
        justifyContent: 'center',
        '& .MuiCard-root': {
          flex: 1,
          maxWidth: { sm: '30%' },
          height: 220, // Fixed height for all cards
          '& .MuiCardContent-root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }
      }}
    >
      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Active Users
          </Typography>
          <Stack spacing={0.5}>
            <Box>
              <Typography variant="h5" color="text.primary" sx={{ mb: 0 }}>
                {activeUsers.daily}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Today
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0 }}>
                {activeUsers.weekly}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This Week
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0 }}>
                {activeUsers.monthly}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This Month
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="subtitle1" color="secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
            Engagement Score
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography variant="h4" color="text.primary" sx={{ mb: 0 }}>
              {engagementScore}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Out of 100
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {engagementScore >= 70 ? 'Excellent' :
             engagementScore >= 40 ? 'Good' : 'Needs Improvement'}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={cardStyle}>
        <CardContent sx={metricCardContent}>
          <Typography variant="subtitle1" color="success.main" sx={{ mb: 1, fontWeight: 'medium' }}>
            Retention Rate
          </Typography>
          <Box sx={{ py: 1 }}>
            <Typography variant="h4" color="text.primary" sx={{ mb: 0 }}>
              {(retentionRate * 100).toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Current Period
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color={retentionRate >= 0.8 ? 'success.main' :
                   retentionRate >= 0.6 ? 'warning.main' : 'error.main'}
            sx={{ mt: 0.5 }}
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
