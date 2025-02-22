import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  useTheme,
  Tabs,
  Tab,
  Box
} from '@mui/material';
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

// Style constants
const styles = {
  header: {
    bgcolor: 'background.paper',
    borderBottom: 1,
    borderColor: 'divider',
    py: 4,
    width: '100%'
  },
  title: {
    fontWeight: 'bold',
    color: 'text.primary',
    mb: 3
  },
  chartContainer: {
    maxWidth: 550,
    flexGrow: 1
  },
  chartPaper: {
    p: { xs: 2, sm: 3 },
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  },
  insightsPaper: {
    p: { xs: 2, sm: 3 },
    maxWidth: 800,
    minHeight: 300,
    width: '100%'
  }
};

// TabPanel component to handle tab content
/**
 * @typedef {Object} TabPanelProps
 * @property {React.ReactNode} children - The content of the tab panel
 * @property {number} value - The current selected tab value
 * @property {number} index - The index of this tab panel
 * @property {string} [label] - Accessibility label for the tab panel
 */

/**
 * TabPanel component that displays content for a specific tab
 * @param {TabPanelProps} props - The component props
 */
function TabPanel({ children, value, index, label, ...other }) {
  const panelId = `dashboard-tabpanel-${index}`;
  const labelId = `dashboard-tab-${index}`;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={panelId}
      aria-labelledby={labelId}
      aria-label={label}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

/**
 * Main App component that renders the dashboard
 */
function App() {
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: [null, null],
    retentionCategory: '',
    engagementScoreRange: [0, 100]
  });
  const [selectedTab, setSelectedTab] = useState(0);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
              Customer Engagement Dashboard
            </Typography>
            
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Dashboard Overview" />
              <Tab label="User Activity" />
              <Tab label="Analytics & Insights" />
            </Tabs>
          </Container>

          {/* Tab Content */}
          <TabPanel value={selectedTab} index={0}>
            <DashboardOverview />
          </TabPanel>

          <TabPanel value={selectedTab} index={1}>
            <Container disableGutters sx={{ width: '100%' }}>
              <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
                <FiltersAndSearch onFiltersChange={handleFiltersChange} />
              </Paper>
              <Paper>
                <UserActivityTable filters={filters} />
              </Paper>
            </Container>
          </TabPanel>

          <TabPanel value={selectedTab} index={2}>
            <Container disableGutters sx={{ width: '100%' }}>
              {/* Charts Section */}
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 3, textAlign: 'center', fontWeight: 'medium' }}
              >
                Analytics &amp; Trends
              </Typography>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                aria-label="Dashboard Analytics Charts"
              >
                <Grid item xs={12} sm={6} md={4} sx={styles.chartContainer}>
                  <Paper
                    elevation={2}
                    sx={styles.chartPaper}
                    aria-label="Active Users Chart"
                  >
                    <ActiveUsersChart />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={styles.chartContainer}>
                  <Paper
                    elevation={2}
                    sx={styles.chartPaper}
                    aria-label="Engagement Score Chart"
                  >
                    <EngagementScoreChart />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={styles.chartContainer}>
                  <Paper
                    elevation={2}
                    sx={styles.chartPaper}
                    aria-label="Retention Rate Chart"
                  >
                    <RetentionRateChart />
                  </Paper>
                </Grid>
              </Grid>

              {/* AI Insights */}
              <Box
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                aria-label="AI Generated Insights Section"
              >
                <Paper
                  elevation={2}
                  sx={styles.insightsPaper}
                  aria-label="AI Insights Panel"
                >
                  <AIInsightsPanel />
                </Paper>
              </Box>
            </Container>
          </TabPanel>

        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default App;