import React from 'react';
import { Box, Typography } from '@mui/material';
import { DateRange } from '../../dto/Event';
import { DATETIME_FORMAT } from '../../util/datetime';

interface Props {
  searchQuery: DateRange;
}

export default function DateSearchNotFound({ searchQuery }: Props) {
  const from = DATETIME_FORMAT.format(searchQuery.from);
  const to = DATETIME_FORMAT.format(searchQuery.to);

  return (
    <Box>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No events found between &nbsp;
        <strong>
          {from}
        </strong>
        {' and '}
        <strong>
          {to}
        </strong>
        .
        Ensure the date range is valid and in the correct format.
      </Typography>
    </Box>
  );
}
