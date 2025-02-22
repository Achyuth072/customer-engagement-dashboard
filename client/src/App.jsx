import React, { useState } from 'react';
import { Container, Typography, Box, Paper, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardOverview from './components/DashboardOverview.jsx';
import UserActivityTable from './components/UserActivityTables.jsx';
import ActiveUsersChart from './components/Charts/ActiveUsersChart.jsx';
import EngagementScoreChart from './components/Charts/EngagementScoreChart.jsx';
import RetentionRateChart from './components/Charts/RetentionRateChart.jsx';
import AIInsightsPanel from './components/AIInsightsPanel.jsx';
import FiltersAndSearch from './components/FiltersAndSearch.jsx';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: [null, null],
    retentionCategory: '',
    engagementScoreRange: [0, 100]
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="App"
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          width: '100%',
          pb: 4 // Add padding at bottom
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            pt: 4,
            pb: 3
          }}
        >
          <Box
            sx={{
              maxWidth: '1200px',
              width: '100%',
              px: { xs: 2, sm: 3 }
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Customer Engagement Dashboard
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            mx: 'auto',
            width: '100%',
            mt: 3
          }}
        >
          {/* Filters and Search */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 }
            }}
          >
            <FiltersAndSearch onFiltersChange={handleFiltersChange} />
          </Paper>

          {/* User Activity Table */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 }
            }}
          >
            <UserActivityTable filters={filters} />
          </Paper>

          {/* Dashboard Overview */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 }
            }}
          >
            <DashboardOverview />
          </Paper>

          {/* Charts Section */}
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                textAlign: 'center',
                fontWeight: 'medium'
              }}
            >
              Analytics & Trends
            </Typography>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              justifyContent="center"
            >
              <Grid xs={12} md={6} sx={{ display: 'flex' }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    width: '100%',
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <ActiveUsersChart />
                </Paper>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex' }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    width: '100%',
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <EngagementScoreChart />
                </Paper>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex' }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    width: '100%',
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <RetentionRateChart />
                </Paper>
              </Grid>
              <Grid xs={12} md={6} sx={{ display: 'flex' }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    width: '100%',
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <AIInsightsPanel />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default App;