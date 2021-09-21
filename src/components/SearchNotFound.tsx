import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface Props {
  searchQuery: string;
}

export default function SearchNotFound({ searchQuery }: Props) {
  return (
    <Box>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>
          {`'${searchQuery}'`}
        </strong>
        .
        Try checking for typos or using complete words.
      </Typography>
    </Box>
  );
}
