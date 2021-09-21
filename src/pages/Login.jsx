import React from 'react';
import {
  Button, Box, TextField, makeStyles, Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from '../components/Logo';
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
  formRow: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: theme.palette.grey[0],
  },
  textField: {
    backgroundColor: theme.palette.grey[0],
  },
  formButton: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
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
            <Logo />
          </Box>
          <TextField
            className={classes.formRow}
            label="Email Address"
            variant="outlined"
            type="email"
            InputLabelProps={{ required: false }}
            required
          />
          <TextField
            className={classes.formRow}
            label="Password"
            variant="outlined"
            type="password"
            InputLabelProps={{ required: false }}
            required
          />
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
  );
};

export default Login;
