import React from 'react';
import {
  Button, Box, TextField, Link, Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTheme, styled } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Logo from '../components/Logo';
import Spinner from '../components/Spinner';
import Page from '../components/Page';
import SpiderIcon from '../assets/spider1.png';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updatePassword, passwordChangeFailed } from '../redux/action/authAction';

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

const ResetPassword = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const onPasswordUpdate = () => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const minLength = 8;
    if (password === confirmPassword && password.length >= minLength) {
      dispatch(updatePassword(password));
      // dispatch(cleanupError());
      // if (user) {
      //   history.push('/');
      // }
    } else {
      dispatch(passwordChangeFailed({ err: 'Please ensure passwords are 7 characters and identical' }));
    }
  };

  return (
    <Page title="Reset Password - OneThread">
      <Box className={classes.root}>
        <Box className={classes.signInLink}>
          Go Back?
          {' '}
          <Link component={RouterLink} to="/account">
            <Box display="inline" fontWeight={theme.typography.fontWeightBold}>
              Yes
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
              onClick={onPasswordUpdate}
            >
              {
                isLoading
                  ? <Spinner />
                  : (
                    <>
                      <VpnKeyIcon />
                      Reset Password
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

export default ResetPassword;
