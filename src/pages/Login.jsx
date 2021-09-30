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
  forgotPasswordLink: {
    textAlign: 'right',
    paddingTop: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(1),
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
  formButton: {
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.25),
  },
}));

const FormTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
  backgroundColor: theme.palette.grey[0],
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Page title="Login - OneThread">
      <Box className={classes.root}>
        <Box className={classes.signInLink}>
          Don&apos;t have an account?
          {' '}
          <Link component={RouterLink} to="/register">
            <Box display="inline" fontWeight={theme.typography.fontWeightBold}>
              Join now
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
              label="Email Address"
              variant="outlined"
              type="email"
              // FIXME: required field
            />
            <FormTextField
              label="Password"
              variant="outlined"
              type="password"
              // FIXME: required field
            />
            <Box className={classes.forgotPasswordLink}>
              {' '}
              <Link component={RouterLink} to="/forgot-password">
                <Box
                  display="inline"
                  style={{ 'text-decoration': 'underline' }}
                  fontWeight={theme.typography.fontWeightRegular}
                  fontSize={theme.typography.caption.fontSize}
                  color={theme.palette.common.black}
                >
                  Forgot password?
                </Box>
              </Link>
            </Box>
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
            >
              <ExitToAppIcon />
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Login;
