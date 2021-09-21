import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactsIcon from '@mui/icons-material/Contacts';
import NoteIcon from '@mui/icons-material/Note';
import Logo from '../components/Logo';

const PREFIX = 'DashboardLayout';
const DRAWER_WIDTH = 240;

const classes = {
  root: `${PREFIX}-root`,
  appBar: `${PREFIX}-appBar`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerContainer: `${PREFIX}-drawerContainer`,
  content: `${PREFIX}-content`,
};

const Root = styled('div')((
  {
    theme,
  }: {
    theme: Theme,
  },
) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  },

  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#383736',
  },

  [`& .${classes.drawer}`]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    width: DRAWER_WIDTH,
  },

  [`& .${classes.drawerContainer}`]: {
    paddingTop: theme.spacing(8),
    overflow: 'auto',
  },

  [`& .${classes.content}`]: {
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
  const theme = useTheme();

  return (
    <Root theme={theme} className={classes.root}>
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
    </Root>
  );
};

export default DashboardLayout;
