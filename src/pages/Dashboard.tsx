import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import Page from '../components/Page';

const Dashboard = () => {
  const theme = useTheme() as any;

  return (
    <Page title="Dashboard - OneThread">
      <Box
        sx={{
          minHeight: '100vh',
          textAlign: 'center',
          marginTop: theme.spacing(8),
        }}
      >
        <Typography variant="h2">
          Hello,
          {' '}
          <Typography variant="h2" display="inline" color="primary">
            ADMIN
          </Typography>
          !
        </Typography>
      </Box>
    </Page>
  );
};

export default Dashboard;
