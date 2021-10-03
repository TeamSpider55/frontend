import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import Page from '../components/Page';

const PageNotFound = () => {
  const theme = useTheme() as any;

  return (
    <Page title="Page Not Found - OneThread">
      <Box
        sx={{
          minHeight: '100vh',
          textAlign: 'center',
          marginTop: theme.spacing(8),
        }}
      >
        <Typography variant="h2">
          Page not found...
        </Typography>
      </Box>
    </Page>
  );
};

export default PageNotFound;
