import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material';
import Page from '../components/Page';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

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
          <Button onClick={() => AuthService.login()}>
            LOGIN
          </Button>
          <Button onClick={() => UserService.getUser()}>
            PROFILE
          </Button>
          <Button onClick={() => UserService.logout()}>
            LOGOUT
          </Button>
        </Typography>
      </Box>
    </Page>
  );
};

export default Dashboard;
