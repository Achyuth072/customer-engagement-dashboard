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
  const [lastLoginDate, setLastLoginDate] = useState(null);
  const [retentionCategory, setRetentionCategory] = useState('');
  const [engagementScoreRange, setEngagementScoreRange] = useState([0, 100]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    triggerFilterChange({ searchQuery: value });
  };

  const handleLastLoginDateChange = (date) => {
    try {
      console.log('FiltersAndSearch - Selected date (raw):', date);
      if (!date) {
        setLastLoginDate(null);
        triggerFilterChange({ lastLoginDate: null });
        return;
      }

      // Keep original dayjs object for DatePicker
      setLastLoginDate(date);

      // Format date as YYYY-MM-DD for consistency
      const formattedDate = date.format('YYYY-MM-DD');
      console.log('FiltersAndSearch - Using date:', formattedDate);

      // Pass the formatted date string
      triggerFilterChange({ lastLoginDate: formattedDate });
    } catch (error) {
      console.error('Error handling date change:', error);
      setLastLoginDate(null);
      triggerFilterChange({ lastLoginDate: null });
    }
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
      // If we're changing the date, use the formatted date string
      const currentLoginDate = changedFilter.lastLoginDate !== undefined
        ? changedFilter.lastLoginDate
        : (lastLoginDate ? lastLoginDate.format('YYYY-MM-DD') : null);

      onFiltersChange({
        searchQuery,
        lastLoginDate: currentLoginDate,
        retentionCategory,
        engagementScoreRange,
        ...changedFilter
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', px: { xs: 1, sm: 2 } }}>
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

          <DatePicker
            label="Last Login Date"
            value={lastLoginDate}
            onChange={handleLastLoginDateChange}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />

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
    </LocalizationProvider>
  );
};

export default FiltersAndSearch;