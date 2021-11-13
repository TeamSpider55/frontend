import React, { useState } from 'react';
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
import MessageModal from '../components/MessageModal';
import SpiderIcon from '../assets/spider1.png';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { register, registerFailed, cleanupError } from '../redux/action/authAction';

const useStyles = makeStyles((theme: any) => ({
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

const FormTextField = styled(TextField)(({ theme }: any) => ({
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const alphanumeric = /[a-zA-Z0-9]+/g;

  const onRegister = () => {
    if (userName === '' || givenName === '' || familyName === '') {
      dispatch(registerFailed(
        { err: 'Ensure all fields are filled in.' },
      ));
      return;
    }

    const minLength = 8;
    if (password.length < minLength) {
      dispatch(registerFailed(
        { err: 'Passwords must be at least 8 characters' },
      ));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(registerFailed(
        { err: 'Ensure the passwords are identical.' },
      ));
      return;
    }

    if (!alphanumeric.test(userName)) {
      dispatch(registerFailed(
        { err: 'Ensure username is alphanumeric.' },
      ));
      return;
    }

    dispatch(cleanupError());

    dispatch(register({
      email,
      userName,
      familyName,
      givenName,
      password,
      phone: '-',
      address: '-',
    })).then(() => {
      setIsModalOpen(true);
    });
  };

  return (
    <Page title="Register - OneThread">
      <Box className={classes.root}>
        <MessageModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title="Confirm registration"
          message={`If your username was available
            a registration confirmation link will be sent to ${email}.`}
          buttonText="Go to Login page"
          buttonOnClick={() => history.push('/login')}
        />
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
              <Logo darktext />
            </Box>
            <FormTextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />
            <FormTextField
              id="email"
              label="Email Address"
              variant="outlined"
              onChange={(e: any) => setEmail(e.target.value)}
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
                  onChange={(e: any) => setGivenName(e.target.value)}
                  required
                />
              </Box>
              <Box flexGrow={1} marginLeft={theme.spacing(1)}>
                <FormTextField
                  sx={{ width: '100%' }}
                  id="familyName"
                  label="Family Name"
                  variant="outlined"
                  onChange={(e: any) => setFamilyName(e.target.value)}
                  required
                />
              </Box>
            </Box>
            <FormTextField
              id="password"
              label="Password"
              variant="outlined"
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
              required
            />
            <FormTextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
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
