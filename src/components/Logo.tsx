import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';

interface LogoHighlightProps {
  theme: Theme;
}

const LogoHighlight = styled('span')(({ theme }: LogoHighlightProps) => ({
  color: theme.palette.primary.light,
  fontWeight: theme.typography.fontWeightBold,
  '-moz-user-select': 'none',
  '-webkit-user-select': 'none',
  '-ms-user-select': 'none',
  'user-select': 'none',
  '-o-user-select': 'none',
}));

const LogoFront = styled('span')(() => ({
  '-moz-user-select': 'none',
  '-webkit-user-select': 'none',
  '-ms-user-select': 'none',
  'user-select': 'none',
  '-o-user-select': 'none',
}));

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      style={{ cursor: 'pointer' }}
    >
      <LogoFront>
        One
      </LogoFront>
      <LogoHighlight theme={theme}>Thread</LogoHighlight>
    </Typography>
  );
};

export default Logo;
