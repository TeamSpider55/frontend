import React from 'react';
import {
  Button, Box, TextField, Link,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import Page from '../components/Page';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { User } from '../dto/User';
import { logout } from '../redux/action/authAction';
import Spinner from '../components/Spinner';

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  changePasswordLink: {
    textAlign: 'right',
    paddingTop: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(6),
  },
  textField: {
    display: 'inline-block',
    backgroundColor: theme.palette.grey[0],
    borderRadius: '4px',
    '& input': {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
    },
  },
  splitRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formButton: {
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.25),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  formLabel: {
    textAlign: 'right',
    fontWeight: theme.typography.fontWeightBold,
    marginLeft: 'auto',
    marginRight: theme.spacing(3),
  },
  img: {
    borderRadius: '10px',
  },
}));

const Account = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as User;
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const onLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    history.push('/login');
  }

  return (
    <Page title="Account - OneThread">
      <Box className={classes.root}>
        <Box textAlign="center" paddingTop={theme.spacing(10)}>
          Currently logged in as:
          <h2>
            {user.userName}
          </h2>
        </Box>
        <Box className={classes.formContainer}>
          <Box className={classes.form}>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Email</Box>
              <TextField
                className={classes.textField}
                variant="standard"
                value={user.email}
                sx={{ backgroundColor: theme.palette.grey[200] }}
                inputProps={
                  {
                    readOnly: true,
                  }
                }
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Phone</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
                inputProps={{ maxLength: 12 }}
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Location</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Given Name</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Middle Name</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Family Name</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
              />
            </Box>
            <Box className={classes.splitRow}>
              <Box className={classes.formLabel}>Nickname</Box>
              <TextField
                className={classes.textField}
                variant="outlined"
              />
            </Box>
            <Box className={classes.changePasswordLink}>
              {' '}
              <Link component={RouterLink} to="/forgot-password">
                <Box
                  display="inline"
                  sx={{ textDecoration: 'underline' }}
                  fontWeight={theme.typography.fontWeightRegular}
                  fontSize={theme.typography.caption.fontSize}
                  color={theme.palette.common.black}
                >
                  Change password
                </Box>
              </Link>
            </Box>
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
              disabled
            >
              <EditIcon />
              Update
            </Button>
            <Button
              className={classes.formButton}
              variant="contained"
              color="primary"
              onClick={onLogout}
            >
              {
                isLoading
                  ? <Spinner />
                  : (
                    <>
                      <LogoutIcon />
                      Sign out
                    </>
                  )
              }
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Account;
