import React from 'react';
import {
  Button, Box, TextField, Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
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

const ForgotPassword = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Page title="Forgot Password - OneThread">
      <Box className={classes.root}>
        <Box className={classes.signInLink}>
          Remember the password?
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
              label="Email Address"
              variant="outlined"
              type="email"
            />
            <FormButton
              variant="contained"
              color="primary"
              disabled
            >
              <EmailIcon />
              Reset Password
            </FormButton>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default ForgotPassword;
