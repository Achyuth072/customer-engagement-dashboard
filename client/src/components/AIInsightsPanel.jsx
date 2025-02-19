import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
  Divider,
  useTheme
} from '@mui/material';
import {
  TrendingDown,
  Warning,
  Lightbulb,
  Stars,
  Timeline,
  Speed
} from '@mui/icons-material';
import { getUsers, getMetrics } from '../services/api.jsx';

const AIInsightsPanel = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, churnPredictions] = await Promise.all([
          getUsers(),
          getMetrics('churn-predictions')
        ]);
        const generatedInsights = generateInsights(users, churnPredictions);
        setInsights(generatedInsights);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data for insights:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateInsights = (users, churnPredictions) => {
    const insights = [];
    
    // Calculate metrics
    const avgEngagement = users.reduce((sum, user) => sum + user.engagementScore, 0) / users.length;
    const lowEngagementUsers = users.filter(user => user.engagementScore < 30);
    
    // Add insights based on metrics
    if (lowEngagementUsers.length > 0) {
      insights.push({
        type: 'warning',
        icon: <Warning />,
        title: 'Low Engagement Alert',
        content: `${lowEngagementUsers.length} users have engagement scores below 30. Consider reaching out with personalized assistance.`
      });
    }

    if (avgEngagement > 70) {
      insights.push({
        type: 'success',
        icon: <Stars />,
        title: 'High Average Engagement',
        content: 'User engagement is strong. Consider rewarding active users to maintain momentum.'
      });
    }

    insights.push({
      type: 'pattern',
      icon: <Timeline />,
      title: 'Usage Patterns',
      content: 'Peak activity observed during weekday mornings. Consider scheduling maintenance during off-peak hours.'
    });

    insights.push({
      type: 'performance',
      icon: <Speed />,
      title: 'Performance Metrics',
      content: 'Average session duration has increased by 15% compared to last month.'
    });

    insights.push({
      type: 'opportunity',
      icon: <Lightbulb />,
      title: 'Growth Opportunity',
      content: 'Consider implementing a referral program to leverage your highly engaged users.'
    });

    insights.push({
      type: 'risk',
      icon: <TrendingDown />,
      title: 'Churn Risk',
      content: 'Detected increased inactivity in premium users. Consider targeted re-engagement campaign.'
    });

    return insights;
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'warning': return theme.palette.warning.main;
      case 'success': return theme.palette.success.main;
      case 'pattern': return theme.palette.info.main;
      case 'performance': return theme.palette.primary.main;
      case 'opportunity': return theme.palette.secondary.main;
      case 'risk': return theme.palette.error.main;
      default: return theme.palette.text.primary;
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography 
        className="chart-title"
        variant="h6"
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Stars fontSize="small" />
        AI-Powered Insights
      </Typography>
      
      <Box 
        className="chart-container insights-scroll"
        sx={{ 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <List disablePadding>
          {insights.map((insight, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Divider 
                  variant="middle" 
                  sx={{ 
                    my: 1,
                    borderColor: theme.palette.divider 
                  }} 
                />
              )}
              <ListItem 
                sx={{ 
                  px: 1,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: getIconColor(insight.type),
                    minWidth: 40 
                  }}
                >
                  {insight.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 'medium',
                        mb: 0.5,
                        color: 'text.primary'
                      }}
                    >
                      {insight.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {insight.content}
                    </Typography>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AIInsightsPanel;