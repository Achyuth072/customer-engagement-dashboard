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
    maxWidth: '800px',
    mb: 2,
    borderRadius: 2,
    boxShadow: theme.shadows[2]
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      {/* Active Users Card */}
      <Card sx={cardStyle}>
        <CardContent sx={{ py: 3 }}> {/* Added more vertical padding */}
          <Typography variant="h6" color="primary" sx={{ mb: 3, fontWeight: 'medium' }}>
            Active Users
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', // Changed from space-between to space-around
            width: '100%'
          }}>
            <Box sx={{ textAlign: 'center' }}> {/* Added center alignment */}
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                {activeUsers.daily}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                {activeUsers.weekly}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This Week
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                {activeUsers.monthly}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
            <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>
              {engagementScore}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
            <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }}>
              {(retentionRate * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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