import React, { useState } from 'react';
import {
  Button, Box, TextField, Link, Alert,
} from '@mui/material';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../components/Logo';
import Page from '../components/Page';
import SpiderIcon from '../assets/spider1.png';
import { login } from '../redux/action/authAction';
import { useAppDispatch } from '../redux/store';

const useStyles = makeStyles((theme: any) => ({
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

const FormTextField = styled(TextField)(({ theme }: any) => ({
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(1.25),
  backgroundColor: theme.palette.grey[0],
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  const submitLogin = async () => {
    dispatch(login({ id: username, password }));
  };

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
              <Logo darktext />
            </Box>
            <FormTextField
              label="Username"
              variant="outlined"
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <FormTextField
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Box className={classes.forgotPasswordLink}>
              {' '}
              <Link component={RouterLink} to="/forgot-password">
                <Box
                  display="inline"
                  // style={{ 'text-decoration': 'underline' }}
                  fontWeight={theme.typography.fontWeightRegular}
                  fontSize={theme.typography.caption.fontSize}
                  color={theme.palette.common.black}
                >
                  Forgot password?
                </Box>
              </Link>
            </Box>
            {
              isError
                ? (
                  <Alert severity="error">
                    Invalid username or password.
                  </Alert>
                )
                : null
            }
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
              onClick={submitLogin}
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
