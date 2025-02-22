import axios from 'axios';
import dayjs from 'dayjs';

const API_URL = 'http://localhost:5000/api';

// Function to get all users with optional filters
export const getUsers = async (filters = {}) => {
  try {
    console.log('API - Received filters:', filters);

    const buildParams = new URLSearchParams();

    // Add search parameter
    if (filters.searchQuery) {
      buildParams.append('search', filters.searchQuery);
    }

    // Add retention category
    if (filters.retentionCategory) {
      buildParams.append('retentionCategory', filters.retentionCategory);
    }

    // Add engagement score range
    if (filters.engagementScoreRange) {
      buildParams.append('minEngagementScore', filters.engagementScoreRange[0]);
      buildParams.append('maxEngagementScore', filters.engagementScoreRange[1]);
    }

    // Add last login date
    if (filters.lastLoginDate) {
      console.log('API - Processing lastLoginDate:', filters.lastLoginDate);
      buildParams.append('lastLoginDate', filters.lastLoginDate);
    }

    // Build the URL with parameters
    const queryString = buildParams.toString();
    const fullUrl = `${API_URL}/users${queryString ? `?${queryString}` : ''}`;
    
    console.log('API - Sending request to:', fullUrl);
    console.log('API - URL parameters:', Object.fromEntries(buildParams.entries()));

    // Make the request
    const response = await axios.get(fullUrl);
    console.log('API - Response received:', {
      userCount: response.data.length,
      firstUser: response.data[0]
    });
    
    return response.data;
  } catch (error) {
    console.error('API - Error fetching users:', error);
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
