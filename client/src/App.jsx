import React, { useState } from 'react';
import { Container, Typography, Paper, useTheme } from '@mui/material';
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
      <div className="App">
        <Container maxWidth="lg" sx={{ bgcolor: theme.palette.background.default, pb: 4 }}>
          {/* Header */}
          <Container
            component="header"
            disableGutters
            sx={{
              bgcolor: 'background.paper',
              borderBottom: 1,
              borderColor: 'divider',
              py: 4,
              width: '100%'
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Customer Engagement Dashboard
            </Typography>
          </Container>

          {/* Dashboard Overview */}
          <Container disableGutters sx={{ mt: 3, width: '100%' }}>
            <DashboardOverview />
          </Container>

          {/* Filters and Search */}
          <Container disableGutters sx={{ mt: 3, width: '100%' }}>
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
              <FiltersAndSearch onFiltersChange={handleFiltersChange} />
            </Paper>
          </Container>

          {/* User Activity Table */}
          <Container disableGutters sx={{ mt: 3, width: '100%' }}>
            <Paper>
              <UserActivityTable filters={filters} />
            </Paper>
          </Container>

          {/* Charts Section */}
          <Container disableGutters sx={{ mt: 3, width: '100%' }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 3, textAlign: 'center', fontWeight: 'medium' }}
            >
              Analytics &amp; Trends
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: 550, flexGrow: 1 }}>
                <Paper
                  elevation={2}
                  sx={{ p: { xs: 2, sm: 3 }, minHeight: 400, display: 'flex', flexDirection: 'column' }}
                >
                  <ActiveUsersChart />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: 550, flexGrow: 1 }}>
                <Paper
                  elevation={2}
                  sx={{ p: { xs: 2, sm: 3 }, minHeight: 400, display: 'flex', flexDirection: 'column' }}
                >
                  <EngagementScoreChart />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: 550, flexGrow: 1 }}>
                <Paper
                  elevation={2}
                  sx={{ p: { xs: 2, sm: 3 }, minHeight: 400, display: 'flex', flexDirection: 'column' }}
                >
                  <RetentionRateChart />
                </Paper>
              </Grid>
            </Grid>
          </Container>

          {/* AI Insights */}
          <Container disableGutters sx={{ mt: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                maxWidth: 800,
                minHeight: 300,
                width: '100%'
              }}
            >
              <AIInsightsPanel />
            </Paper>
          </Container>


        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default App;
