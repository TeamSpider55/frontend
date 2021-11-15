import React from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactsIcon from '@mui/icons-material/Contacts';
import NoteIcon from '@mui/icons-material/Note';
import { useTheme, Theme } from '@mui/material';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) => ({
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
    text: 'Schedule',
    icon: <CalendarTodayIcon />,
    to: '/events',
  },
  {
    text: 'Contacts',
    icon: <ContactsIcon />,
    to: '/contacts',
  },
  {
    text: 'Notes',
    icon: <NoteIcon />,
    to: '/notes',
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
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
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
    </>
  );
};

export default SideBarLayout;
