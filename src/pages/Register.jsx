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
  splitRow: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    display: 'flex',
  },
  formButton: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
}));

const Register = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Box className={classes.root}>
      <Box className={classes.form}>
        <Box textAlign="center" paddingY={theme.spacing(1)}>
          <Logo />
        </Box>
        <TextField className={classes.formRow} label="Username" variant="outlined" />
        <TextField className={classes.formRow} label="Email Address" variant="outlined" />
        <Box className={classes.splitRow}>
          <Box marginRight="0.5rem">
            <TextField className={classes.textField} label="Given Name" variant="outlined" />
          </Box>
          <TextField className={classes.textField} label="Family Name" variant="outlined" />
        </Box>
        <TextField className={classes.formRow} label="Password" variant="outlined" />
        <TextField className={classes.formRow} label="Confirm Password" variant="outlined" />
        <Button className={classes.formButton} variant="contained" color="primary">
          <ExitToAppIcon />
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
