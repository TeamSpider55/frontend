import React, { useMemo } from 'react';
import { CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';

interface Props {
  children: React.ReactNode
}

export default function ThemeConfig({ children }: Props) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
    }),
    [],
  );

  const theme = createTheme(themeOptions as ThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
