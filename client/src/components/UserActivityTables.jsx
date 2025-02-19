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
  Stack
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
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2,
        boxShadow: 2,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="user activity table">
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
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatDate(user.lastLoginDate)}</TableCell>
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
  );
};

export default UserActivityTable;