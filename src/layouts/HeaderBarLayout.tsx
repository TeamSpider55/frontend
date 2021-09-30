import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
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
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            <RouterLink to="/account">
              <AccountIcon sx={{ color: theme.palette.grey[300] }} />
            </RouterLink>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default HeaderBarLayout;
