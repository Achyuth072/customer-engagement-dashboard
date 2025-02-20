import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { getUsers } from '../services/api.jsx';

const UserActivityTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <Typography variant="body1">
          No user data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 3
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2 }}
        align="center"
      >
        User Activity
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          overflow: 'hidden',
          maxWidth: '700px', // Reduced maximum width
          width: '100%'
        }}
      >
        <Table 
          sx={{ 
            '& .MuiTableCell-root': {
              px: 3,
              py: 2,
            }
          }} 
          aria-label="user activity table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Last Login</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight="bold">Engagement Score</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">Retention Category</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'grey.50' }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{formatDate(user.lastLoginDate)}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      color: user.engagementScore >= 70 ? 'success.main' : 
                             user.engagementScore >= 40 ? 'warning.main' : 'error.main',
                      fontWeight: 'medium'
                    }}
                  >
                    {user.engagementScore}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: user.predictedRetentionCategory === 'High' ? 'success.main' :
                             user.predictedRetentionCategory === 'Medium' ? 'warning.main' : 'error.main',
                      fontWeight: 'medium'
                    }}
                  >
                    {user.predictedRetentionCategory}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserActivityTable;