import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Typography, Box, CircularProgress, useTheme } from '@mui/material';
import { getMetrics } from '../../services/api.jsx';

// Mock data for development
const mockData = [
  { period: 'Jan', retentionRate: 0.95 },
  { period: 'Feb', retentionRate: 0.92 },
  { period: 'Mar', retentionRate: 0.88 },
  { period: 'Apr', retentionRate: 0.85 },
  { period: 'May', retentionRate: 0.82 },
  { period: 'Jun', retentionRate: 0.80 }
].map(item => ({
  ...item,
  retentionRate: item.retentionRate * 100 // Convert to percentage
}));

const RetentionRateChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching retention rate data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const averageRetention = data.length > 0
    ? data.reduce((acc, curr) => acc + curr.retentionRate, 0) / data.length
    : 0;

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
      >
        Retention Rate Trend
      </Typography>
      
      <Box className="chart-container">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 75, // Further increased right margin
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.palette.divider}
            />
            <XAxis
              dataKey="period"
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary }}
              label={{ 
                value: 'Retention Rate (%)', 
                angle: -90, 
                position: 'insideLeft',
                fill: theme.palette.text.secondary,
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[3],
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '8px',
              }}
            />
            <ReferenceLine 
              y={averageRetention} 
              label={{
                value: `Avg: ${Math.round(averageRetention)}%`, // Rounded to whole number
                fill: theme.palette.text.secondary,
                position: 'right',
                offset: 15,
                style: {
                  fontSize: '0.75rem',
                  fontWeight: 'normal'
                }
              }}
              stroke={theme.palette.warning.main}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey="retentionRate"
              name="Retention Rate"
              stroke={theme.palette.success.main}
              strokeWidth={2}
              dot={{ 
                r: 4, 
                fill: theme.palette.success.main,
                stroke: theme.palette.success.dark 
              }}
              activeDot={{ 
                r: 6, 
                fill: theme.palette.success.light,
                stroke: theme.palette.success.main 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default RetentionRateChart;