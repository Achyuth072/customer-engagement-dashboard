import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import DashboardOverview from './components/DashboardOverview.jsx';
import UserActivityTable from './components/UserActivityTables.jsx';
import './App.css';

function App() {
  return (
    <Box className="App">
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ py: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            align="center"
            sx={{ mb: 2 }}
          >
            Customer Engagement Dashboard
          </Typography>
          
          <Box>
            <DashboardOverview />
          </Box>

          <Box>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ mb: 3 }}
            >
              User Activity
            </Typography>
            <UserActivityTable />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
