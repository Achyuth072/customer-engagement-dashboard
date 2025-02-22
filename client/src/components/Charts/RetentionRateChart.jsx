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

const RetentionRateChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getMetrics('retention-rate-over-time');
        setData(chartData);
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          px: { xs: 1, sm: 0 }
        }}
      >
        Retention Rate Trend
      </Typography>
      <Box sx={{
        width: '100%',
        height: { xs: 300, sm: 400 },
        px: { xs: 1, sm: 0 }
      }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: window.innerWidth >= 600 ? 90 : 60,
              left: window.innerWidth >= 600 ? 20 : 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
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
                position: window.innerWidth >= 600 ? 'insideLeft' : 'outsideLeft',
                fill: theme.palette.text.secondary,
                style: {
                  fontSize: window.innerWidth >= 600 ? 12 : 10
                }
              }}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '8px' }} />
            <ReferenceLine 
              y={averageRetention} 
              label={{
                value: `Avg: ${Math.round(averageRetention)}%`,
                fill: theme.palette.text.secondary,
                position: 'right',
                offset: window.innerWidth >= 600 ? 15 : 5,
                style: {
                  fontSize: window.innerWidth >= 600 ? 12 : 10
                }
              }}
              stroke={theme.palette.warning.main}
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="retentionRate"
              name="Retention Rate"
              stroke={theme.palette.success.main}
              strokeWidth={window.innerWidth >= 600 ? 2 : 1.5}
              dot={{
                r: window.innerWidth >= 600 ? 4 : 3,
                fill: theme.palette.success.main,
                strokeWidth: window.innerWidth >= 600 ? 1 : 0.5
              }}
              activeDot={{
                r: window.innerWidth >= 600 ? 6 : 5,
                fill: theme.palette.success.main,
                strokeWidth: window.innerWidth >= 600 ? 2 : 1
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default RetentionRateChart;
