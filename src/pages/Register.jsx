import React from 'react';
import {
  Button, Box, TextField, Link, Alert,
} from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../components/Logo';
import Page from '../components/Page';
import Spinner from '../components/Spinner';
import SpiderIcon from '../assets/spider1.png';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { register, registerFailed, cleanupError } from '../redux/action/authAction';

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
  const history = useHistory();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const alphanumeric = '/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i';

  // FIXME: make sure username is alphanumeric
  const onRegister = () => {
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const givenName = document.getElementById('givenName').value;
    const familyName = document.getElementById('familyName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const minLength = 8;
    if (password === confirmPassword && password.length >= minLength) {
      dispatch(register({
        email,
        userName,
        familyName,
        givenName,
        password,
        phone: '-',
        address: '-',
      }));
      // dispatch(cleanupError());
      // if (user) {
      //   history.push('/login');
      // }
    } else {
      dispatch(registerFailed({ err: 'Please ensure passwords are 7 characters and identical' }));
    }
  };

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
              id="username"
              label="Username"
              variant="outlined"
              required
            />
            <FormTextField
              id="email"
              label="Email Address"
              variant="outlined"
              type="email"
              required
            />
            <Box className={classes.splitRow}>
              <Box flexGrow={1} marginRight={theme.spacing(1)}>
                <FormTextField
                  sx={{ width: '100%' }}
                  id="givenName"
                  label="Given Name"
                  variant="outlined"
                  required
                />
              </Box>
              <Box flexGrow={1} marginLeft={theme.spacing(1)}>
                <FormTextField
                  sx={{ width: '100%' }}
                  id="familyName"
                  label="Family Name"
                  variant="outlined"
                  required
                />
              </Box>
            </Box>
            <FormTextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              required
            />
            <FormTextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
            />
            {
            error
              ? (
                <Alert
                  severity="error"
                  sx={{ marginBottom: theme.spacing(4) }}
                >
                  { error }
                </Alert>
              )
              : null
            }
            <FormButton
              variant="contained"
              color="primary"
              onClick={onRegister}
            >
              {
                isLoading
                  ? <Spinner />
                  : (
                    <>
                      <ExitToAppIcon />
                      Register
                    </>
                  )
              }
            </FormButton>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Register;
