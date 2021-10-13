import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface LogoHighlightProps {
  theme: any;
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

const LogoFront = styled('span')({
  // color: theme.palette.grey[darktext ? 800 : 0],
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  OUserSelect: 'none',
});

interface Props {
  darktext?: boolean;
}

const Logo = ({ darktext = false }: Props) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      sx={{ cursor: 'pointer' }}
    >
      <RouterLink to="/">
        <LogoFront>
          <Box sx={{
            color: (theme.palette.grey as any)[darktext ? 800 : 0],
            display: 'inline',
          }}
          >
            One
          </Box>
        </LogoFront>
        <LogoHighlight theme={theme}>Thread</LogoHighlight>
      </RouterLink>
    </Typography>
  );
};

Logo.defaultProps = {
  darktext: false,
};

export default Logo;
