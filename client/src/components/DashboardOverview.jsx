import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, useTheme } from '@mui/material';
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
    width: '100%',
    maxWidth: { xs: '100%', sm: '600px', md: '800px' },
    mb: { xs: 1.5, sm: 2 },
    borderRadius: { xs: 1, sm: 2 },
    boxShadow: theme.shadows[2]
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 }
      }}
    >
      {/* Active Users Card */}
      <Card sx={cardStyle}>
        <CardContent sx={{ py: 3 }}> {/* Added more vertical padding */}
          <Typography
            color="primary"
            sx={{
              mb: 3,
              fontWeight: 'medium',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Active Users
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', // Changed from space-between to space-around
            width: '100%'
          }}>
            <Box sx={{ textAlign: 'center' }}> {/* Added center alignment */}
              <Typography
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {activeUsers.daily}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.2, sm: 1.43 }
                }}
              >
                Today
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {activeUsers.weekly}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.2, sm: 1.43 }
                }}
              >
                This Week
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
                  fontWeight: 600,
                  mb: 0.5
                }}
              >
                {activeUsers.monthly}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: { xs: 1.2, sm: 1.43 }
                }}
              >
                This Month
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Engagement Score Card */}
      <Card sx={cardStyle}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h6" color="secondary" sx={{ mb: 3, fontWeight: 'medium' }}>
            Engagement Score
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
                fontWeight: 600,
                mb: 1
              }}
            >
              {engagementScore}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                lineHeight: { xs: 1.2, sm: 1.43 },
                mb: 2
              }}
            >
              Out of 100
            </Typography>
            <Typography variant="h6" color={
              engagementScore >= 70 ? 'primary.main' : 
              engagementScore >= 40 ? 'warning.main' : 'error.main'
            }>
              {engagementScore >= 70 ? 'Excellent' :
               engagementScore >= 40 ? 'Good' : 'Needs Improvement'}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Retention Rate Card */}
      <Card sx={cardStyle}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h6" color="success.main" sx={{ mb: 3, fontWeight: 'medium' }}>
            Retention Rate
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' },
                fontWeight: 600,
                mb: 1
              }}
            >
              {(retentionRate * 100).toFixed(1)}%
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                lineHeight: { xs: 1.2, sm: 1.43 },
                mb: 2
              }}
            >
              Current Period
            </Typography>
            <Typography variant="h6" color={
              retentionRate >= 0.8 ? 'success.main' :
              retentionRate >= 0.6 ? 'warning.main' : 'error.main'
            }>
              {retentionRate >= 0.8 ? 'Strong Retention' :
               retentionRate >= 0.6 ? 'Average Retention' : 'At Risk'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardOverview;