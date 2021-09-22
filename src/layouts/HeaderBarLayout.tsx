import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../components/Logo';

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();

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
