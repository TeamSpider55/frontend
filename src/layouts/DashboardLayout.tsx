import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import HeaderBarLayout from './HeaderBarLayout';
import SideBarLayout from './SideBarLayout';

const Root = styled('div')(({ theme }: { theme: Theme }) => (
  {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.grey[200],
  }
));

const Content = styled('main')(({ theme }: { theme: Theme }) => (
  {
    flexGrow: 1,
    padding: theme.spacing(5),
  }
));

interface Props {
  children: React.ComponentType;
  showHeaderBar: boolean;
  showSideBar: boolean;
}

const DashboardLayout = ({ children, showHeaderBar, showSideBar }: Props) => {
  const theme = useTheme();

  return (
    <Root theme={theme}>
      {showHeaderBar && <HeaderBarLayout />}
      {showSideBar && <SideBarLayout />}
      <Content theme={theme}>
        { children }
      </Content>
    </Root>
  );
};

export default DashboardLayout;
