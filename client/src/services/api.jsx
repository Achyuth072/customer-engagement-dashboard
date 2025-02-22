import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Function to get all users with optional filters
export const getUsers = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.searchQuery) {
      params.append('search', filters.searchQuery);
    }
    if (filters.retentionCategory) {
      params.append('retentionCategory', filters.retentionCategory);
    }
    if (filters.engagementScoreRange) {
      params.append('minEngagementScore', filters.engagementScoreRange[0]);
      params.append('maxEngagementScore', filters.engagementScoreRange[1]);
    }
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      params.append('startDate', filters.dateRange[0].toISOString());
      params.append('endDate', filters.dateRange[1].toISOString());
    }

    const response = await axios.get(`${API_URL}/users${params.toString() ? `?${params.toString()}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Function to get metrics data (active users, engagement score, retention rate, etc.)
export const getMetrics = async (metricType) => {
  try {
    const response = await axios.get(`${API_URL}/metrics/${metricType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${metricType}:`, error);
    throw error;
  }
};

// Add new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
