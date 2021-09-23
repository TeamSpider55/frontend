import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme, Theme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../components/Logo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#383736',
  },
}));

const HeaderBarLayout = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HeaderBarLayout;
