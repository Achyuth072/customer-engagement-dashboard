import React, { useState } from 'react';
import { Container, Typography, Box, Stack, Paper, useTheme } from '@mui/material';
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
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            py: 4,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Stack spacing={2} sx={{ py: 3 }}>
            {/* Header */}
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 1
              }}
            >
              Customer Engagement Dashboard
            </Typography>
            
            {/* Filters */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mb: 1
            }}>
              <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}>
                <FiltersAndSearch onFiltersChange={handleFiltersChange} />
              </Box>
            </Box>

            {/* Overview Metrics */}
            <Box sx={{ mb: 1 }}>
              <DashboardOverview />
            </Box>

            {/* Charts Section */}
            <Box>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                Analytics & Trends
              </Typography>
              
              <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)'
                },
                width: '100%',
                maxWidth: '100%',
                '& > .MuiPaper-root': {
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  p: 3,
                  '& > *': {
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    maxWidth: '100%'
                  }
                }
              }}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <ActiveUsersChart />
                </Paper>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <EngagementScoreChart />
                </Paper>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <RetentionRateChart />
                </Paper>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <AIInsightsPanel />
                </Paper>
              </Box>
            </Box>

            {/* User Activity Table */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <UserActivityTable filters={filters} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
