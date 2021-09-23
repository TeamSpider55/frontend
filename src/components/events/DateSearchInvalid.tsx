import React from 'react';
import { Box, Typography } from '@mui/material';

export default function DateSearchInvalid() {
  return (
    <Box>
      <Typography gutterBottom align="center" variant="subtitle1">
        Invalid Date Range!
      </Typography>
      <Typography variant="body2" align="center">
        Ensure the date range is valid and in the correct format.
      </Typography>
    </Box>
  );
}
