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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Container 
          maxWidth={false}
          sx={{
            width: '100%',
            height: '100%',
            px: { xs: 2, sm: 3 }, // Responsive padding
          }}
        >
          <Stack spacing={4} sx={{ py: 4 }}>
            {/* Header */}
            <Typography 
              variant="h3" 
              component="h1" 
              align="center"
              sx={{ 
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2
              }}
            >
              Customer Engagement Dashboard
            </Typography>
            
            {/* Filters */}
            <FiltersAndSearch onFiltersChange={handleFiltersChange} />

            {/* Overview Metrics */}
            <Box sx={{ mb: 2 }}>
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
                '& > .MuiPaper-root': {
                  height: '400px', // Fixed height for chart containers
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  '& > *': {
                    flex: 1, // Make all direct children fill the container
                    minHeight: 0 // Allow children to shrink below their content size
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
            <Box>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                User Activity
              </Typography>
              <Paper elevation={2}>
                <UserActivityTable filters={filters} />
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
