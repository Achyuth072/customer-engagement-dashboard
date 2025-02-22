import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
    borderRadius: { xs: 1, sm: 2 },
    boxShadow: theme.shadows[2],
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        px: { xs: 2, sm: 3, md: 4 },
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Grid 
        container 
        spacing={4}
        sx={{ 
          maxWidth: 1400,
          margin: '0 auto'
        }}
      >
        {/* Active Users Card */}
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <CardContent sx={{ py: 4 }}>
              <Typography
                color="primary"
                sx={{
                  mb: 4,
                  fontWeight: 'medium',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  textAlign: 'center'
                }}
              >
                Active Users
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around',
                width: '100%',
                gap: { xs: 2, sm: 3 }
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {activeUsers.daily}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                    Today
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {activeUsers.weekly}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                    This Week
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {activeUsers.monthly}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                    This Month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Engagement Score Card */}
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <CardContent sx={{ py: 4 }}>
              <Typography 
                variant="h6" 
                color="secondary" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'medium',
                  textAlign: 'center',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Engagement Score
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {engagementScore}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.5,
                    mb: 2
                  }}
                >
                  Out of 100
                </Typography>
                <Typography 
                  variant="h6" 
                  color={
                    engagementScore >= 70 ? 'primary.main' : 
                    engagementScore >= 40 ? 'warning.main' : 'error.main'
                  }
                  sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                >
                  {engagementScore >= 70 ? 'Excellent' :
                   engagementScore >= 40 ? 'Good' : 'Needs Improvement'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Retention Rate Card */}
        <Grid xs={4}>
          <Card sx={cardStyle}>
            <CardContent sx={{ py: 4 }}>
              <Typography 
                variant="h6" 
                color="success.main" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'medium',
                  textAlign: 'center',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Retention Rate
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  {(retentionRate * 100).toFixed(1)}%
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.5,
                    mb: 2
                  }}
                >
                  Current Period
                </Typography>
                <Typography 
                  variant="h6" 
                  color={
                    retentionRate >= 0.8 ? 'success.main' :
                    retentionRate >= 0.6 ? 'warning.main' : 'error.main'
                  }
                  sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                >
                  {retentionRate >= 0.8 ? 'Strong Retention' :
                   retentionRate >= 0.6 ? 'Average Retention' : 'At Risk'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
