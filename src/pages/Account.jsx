import React from 'react';
import {
  Button, Box, TextField, makeStyles, Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
// import LogoutIcon from '@material-ui/icons/Logout';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  imgNameWrapper: {
    marginTop: '128px',
    display: 'flex',
    flexDirection: 'row',
  },
  contactImgWrapper: {
    display: 'block',
    height: '144px',
    width: '144px',
    marginLeft: '48px',
    '& img': {
      height: '100%',
      width: '100%',
      borderRadius: '10px',
    },
  },
  contactName: {
    margin: '0 32px',
    fontWeight: 'bolder',
    fontSize: '32px',
  },
  contactInfo: {
    margin: '0 32px',
    fontSize: '16px',
  },
  detailLabelWrapper: {
    display: 'inline-block',
    marginLeft: '-48px',
    marginTop: '24px',
    marginRight: '8px',
    textAlign: 'right',
    width: 'fit-content',
    '& div': {
      marginTop: '0.5em',
      marginBottom: '0.5em',
      fontWeight: 'bold',
    },
  },
  detailWrapper: {
    display: 'inline-block',
    left: 'auto',
    right: '0',
    marginTop: '24px',
    marginLeft: '16px',
    verticalAlign: 'top',
    '& input': {
      fontFamily: 'Cairo',
      fontWeight: 'lighter',
      padding: '0',
      marginTop: '0.25em',
      marginBottom: '0.25em',
      resize: 'none',
    },
  },
  changePasswordLink: {
    textAlign: 'right',
    paddingTop: theme.spacing(1),
    paddingRight: '0px',
    paddingBottom: theme.spacing(3),
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  formRow: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: theme.palette.grey[0],
  },
  textField: {
    backgroundColor: theme.palette.grey[0],
    marginTop: '0.68em',
    borderRadius: '5px',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '20%',
  },
  formButton: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
  },
}));

const Account = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <Box className={classes.root}>
        <Box textAlign="center" paddingTop={theme.spacing(2)}>
          <img src="" alt="profile" width="144" height="144" />
          <h2>User full name</h2>
        </Box>
        <Box className={classes.formContainer}>
          <Box className={classes.form}>
            <Box className={classes.detailLabelWrapper}>
              <div>Email</div>
              <div>Phone Number</div>
              <div>Location</div>
              <div>Given Name</div>
              <div>Middle Name</div>
              <div>Family Name</div>
              <div>Nickname</div>
              <div>Password</div>
            </Box>
            <Box className={classes.detailWrapper}>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  inputProps={
                    {
                      readOnly: true,
                    }
                  }
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                />
              </Box>
              <Box className={classes.changePasswordLink}>
                {' '}
                <Link component={RouterLink} to="/forgot-password">
                  <Box display="inline" style={{ 'text-decoration': 'underline' }} fontWeight={theme.typography.fontWeightRegular} fontSize={theme.typography.caption.fontSize} color={theme.palette.common.black}>
                    Change password
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.formContainer}>
          <Box className={classes.buttonContainer}>

            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
            >
              {/* <LogoutIcon /> */}
              Update
            </Button>
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
            >
              {/* <LogoutIcon /> */}
              Sign out
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Account;
