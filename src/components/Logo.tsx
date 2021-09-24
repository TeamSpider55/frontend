import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

interface LogoHighlightProps {
  theme: any;
}

interface LogoFrontProps {
  theme: any;
  dark: boolean;
}

const LogoHighlight = styled('span')(({ theme }: LogoHighlightProps) => ({
  color: theme.palette.primary.light,
  fontWeight: theme.typography.fontWeightBold,
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  OUserSelect: 'none',
}));

const LogoFront = styled('span')(({ theme, dark }: LogoFrontProps) => ({
  color: theme.palette.grey[dark ? 800 : 0],
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  OUserSelect: 'none',
}));

interface Props {
  dark?: boolean;
}

const Logo = ({ dark = false }: Props) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      sx={{ cursor: 'pointer' }}
    >
      <RouterLink to="/">
        <LogoFront theme={theme} dark={dark}>One</LogoFront>
        <LogoHighlight theme={theme}>Thread</LogoHighlight>
      </RouterLink>
    </Typography>
  );
};

Logo.defaultProps = {
  dark: false,
};

export default Logo;
