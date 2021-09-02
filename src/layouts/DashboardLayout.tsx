import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactsIcon from '@material-ui/icons/Contacts';
import NoteIcon from '@material-ui/icons/Note';
import Logo from '../components/Logo';

const DRAWER_WIDTH = 240;

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
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

interface Props {
  children: React.ComponentType;
}

const DashboardLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </AppBar>
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
      <main className={classes.content}>
        { children }
      </main>
    </div>
  );
};

export default DashboardLayout;
