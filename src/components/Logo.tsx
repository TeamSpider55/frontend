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
}));

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography variant="h3">
      One
      <LogoHighlight theme={theme}>Thread</LogoHighlight>
    </Typography>
  );
};

export default Logo;
