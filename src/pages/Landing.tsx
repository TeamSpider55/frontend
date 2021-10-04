import React from 'react';
import {
  Button, Box, Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BackgroundImage from '../assets/background.png';
import Page from '../components/Page';

const Landing = () => {
  const theme = useTheme();
  const history = useHistory();

  // FIXME: not taking font sizes from theme.typography...
  return (
    <Page title="OneThread">
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: (theme.palette.background as any).neutral,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            marginTop: theme.spacing(15),
            marginLeft: theme.spacing(6),
            maxWidth: '50%',
            backgroundColor: 'grey',
          }}
        >
          <Typography variant="h2" color={theme.palette.primary.dark}>
            Welcome to your Personal CRM
          </Typography>
          <Box sx={{
            fontSize: theme.typography.h4,
            fontWeight: theme.typography.fontWeightLight,
          }}
          >
            Manage your contacts, daily schedules and appointments
            in a secure and extensible platform!
          </Box>
          <Box sx={{
            marginTop: theme.spacing(15),
          }}
          >
            <Button
              onClick={() => history.push('/register')}
              sx={{
                margin: theme.spacing(1.25),
                fontSize: '1.8rem',
              }}
              variant="contained"
              color="primary"
            >
              <PeopleAltIcon fontSize="large" />
              &nbsp;
              Join
            </Button>
            <Button
              onClick={() => history.push('/login')}
              sx={{
                margin: theme.spacing(1.25),
                fontSize: '1.8rem',
              }}
              variant="outlined"
              color="primary"
            >
              <ExitToAppIcon fontSize="large" />
              &nbsp;
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Landing;
