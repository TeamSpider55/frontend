import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBarLayout from './HeaderBarLayout';
import SideBarLayout from './SideBarLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

interface Props {
  children: React.ComponentType;
}

const DashboardLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderBarLayout />
      <SideBarLayout />
      <main className={classes.content}>
        { children }
      </main>
    </div>
  );
};

export default DashboardLayout;
