import React from 'react';
import {
  Button, Box, TextField, Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../components/Logo';
import Page from '../components/Page';
import SpiderIcon from '../assets/spider1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.background.neutral,
  },
  signInLink: {
    textAlign: 'right',
    padding: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '30%',
  },
  splitRow: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    display: 'flex',
  },
}));

const FormTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
  backgroundColor: theme.palette.grey[0],
}));

const FormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
}));

const Register = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // FIXME: make sure username is alphanumeric

  return (
    <Page title="Register - OneThread">
      <Box className={classes.root}>
        <Box className={classes.signInLink}>
          Already have an account?
          {' '}
          <Link component={RouterLink} to="/login">
            <Box display="inline" fontWeight={theme.typography.fontWeightBold}>
              Sign in
            </Box>
          </Link>
        </Box>
        <Box className={classes.formContainer}>
          <Box className={classes.form}>
            <Box textAlign="center" paddingBottom={theme.spacing(1)}>
              <img src={SpiderIcon} alt="spider" width="100" height="100" />
              <Logo dark />
            </Box>
            <FormTextField
              label="Username"
              variant="outlined"
            />
            <FormTextField
              label="Email Address"
              variant="outlined"
              type="email"
            />
            <Box className={classes.splitRow}>
              <Box flexGrow={1} marginRight={theme.spacing(1)}>
                <FormTextField
                  sx={{ width: '100%' }}
                  label="Given Name"
                  variant="outlined"
                />
              </Box>
              <Box flexGrow={1} marginLeft={theme.spacing(1)}>
                <FormTextField
                  sx={{ width: '100%' }}
                  label="Family Name"
                  variant="outlined"
                />
              </Box>
            </Box>
            <FormTextField
              label="Password"
              variant="outlined"
              type="password"
            />
            <FormTextField
              label="Confirm Password"
              variant="outlined"
              type="password"
            />
            <FormButton
              variant="contained"
              color="primary"
            >
              <ExitToAppIcon />
              Register
            </FormButton>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Register;
