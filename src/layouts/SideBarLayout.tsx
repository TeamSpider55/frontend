import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactsIcon from '@material-ui/icons/Contacts';
import NoteIcon from '@material-ui/icons/Note';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerContainer: {
    paddingTop: theme.spacing(8),
    overflow: 'auto',
  },
}));

const sidebarItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    to: '/dashboard',
  },
  {
    text: 'Calendar',
    icon: <CalendarTodayIcon />,
    to: '/calendar',
  },
  {
    text: 'Contacts',
    icon: <ContactsIcon />,
    to: '/contacts',
  },
  {
    text: 'Memos',
    icon: <NoteIcon />,
    to: '/memos',
  },
];

const SidebarContent = () => {
  return (
    <List>
      {
        sidebarItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.to}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))
      }
    </List>
  );
};

const SideBarLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <SidebarContent />
        </div>
      </Drawer>
    </div>
  );
};

export default SideBarLayout;
