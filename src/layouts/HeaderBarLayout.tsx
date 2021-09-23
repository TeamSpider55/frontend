import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../components/Logo';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => (
  {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#383736',
  }
));

const HeaderBarLayout = () => {
  const theme = useTheme();

  return (
    <>
      <StyledAppBar theme={theme}>
        <Toolbar>
          <Logo />
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default HeaderBarLayout;
