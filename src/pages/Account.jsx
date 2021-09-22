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
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'row',
  },
  contactImgWrapper: {
    display: 'block',
    height: '144px',
    width: '144px',
    marginLeft: theme.spacing(6),
    '& img': {
      height: '100%',
      width: '100%',
      borderRadius: '10px',
    },
  },
  detailLabelWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(-6),
    marginRight: theme.spacing(1),
    textAlign: 'right',
    width: 'fit-content',
    '& div': {
      marginTop: theme.spacing(1.25),
      marginBottom: theme.spacing(1.25),
      fontWeight: 'bold',
    },
  },
  detailWrapper: {
    display: 'inline-block',
    left: 'auto',
    right: '0',
    marginLeft: theme.spacing(2),
    verticalAlign: 'top',
    '& input': {
      margin: theme.spacing(0.75),
      padding: theme.spacing(0),
    },
  },
  changePasswordLink: {
    textAlign: 'right',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(0),
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
  textField: {
    backgroundColor: theme.palette.grey[0],
    marginTop: theme.spacing(1.45),
    borderRadius: '5px',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '20%',
    marginBottom: theme.spacing(6),
  },
  formButton: {
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.25),
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
              <Box>Email</Box>
              <Box>Phone Number</Box>
              <Box>Location</Box>
              <Box>Given Name</Box>
              <Box>Middle Name</Box>
              <Box>Family Name</Box>
              <Box>Nickname</Box>
              <Box>Password</Box>
            </Box>
            <Box className={classes.detailWrapper}>
              <Box>
                <TextField
                  className={classes.textField}
                  variant="standard"
                  defaultValue="Exmaple1"
                  style={{ 'background-color': theme.palette.grey[200] }}
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
