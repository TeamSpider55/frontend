import React from 'react';
import {
  Button, Box, TextField, makeStyles,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from '../components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.neutral,
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
      <Box className={classes.form}>
        <Box textAlign="center" paddingY={theme.spacing(1)}>
          <Logo />
        </Box>
        <TextField className={classes.formRow} label="Email Address" variant="outlined" />
        <TextField className={classes.formRow} label="Password" variant="outlined" />
        <Button className={classes.formButton} variant="contained" color="primary">
          <ExitToAppIcon />
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
