import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FiltersAndSearch = ({ onFiltersChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [retentionCategory, setRetentionCategory] = useState('');
  const [engagementScoreRange, setEngagementScoreRange] = useState([0, 100]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    triggerFilterChange({ searchQuery: value });
  };

  const handleDateRangeChange = (index) => (date) => {
    const newDateRange = [...dateRange];
    newDateRange[index] = date;
    setDateRange(newDateRange);
    triggerFilterChange({ dateRange: newDateRange });
  };

  const handleRetentionCategoryChange = (event) => {
    const value = event.target.value;
    setRetentionCategory(value);
    triggerFilterChange({ retentionCategory: value });
  };

  const handleEngagementScoreChange = (event, newValue) => {
    setEngagementScoreRange(newValue);
    triggerFilterChange({ engagementScoreRange: newValue });
  };

  const triggerFilterChange = (changedFilter) => {
    if (onFiltersChange) {
      onFiltersChange({
        searchQuery,
        dateRange,
        retentionCategory,
        engagementScoreRange,
        ...changedFilter
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={3}>
          <Box>
            <TextField
              fullWidth
              label="Search by Name or Email"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
            />
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <DatePicker
              label="Start Date"
              value={dateRange[0]}
              onChange={handleDateRangeChange(0)}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label="End Date"
              value={dateRange[1]}
              onChange={handleDateRangeChange(1)}
              slotProps={{ textField: { size: 'small' } }}
              minDate={dateRange[0] ? dayjs(dateRange[0]) : undefined}
            />
          </Stack>

          <FormControl size="small">
            <InputLabel>Retention Category</InputLabel>
            <Select
              value={retentionCategory}
              label="Retention Category"
              onChange={handleRetentionCategoryChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography gutterBottom>
              Engagement Score Range
            </Typography>
            <Slider
              value={engagementScoreRange}
              onChange={handleEngagementScoreChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              marks={[
                { value: 0, label: '0' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 75, label: '75' },
                { value: 100, label: '100' }
              ]}
            />
          </Box>
        </Stack>
      </Paper>
    </LocalizationProvider>
  );
};

export default FiltersAndSearch;