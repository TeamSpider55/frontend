import React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const LogoHighlight = styled('span')(({ theme }) => ({
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
