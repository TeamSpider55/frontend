import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
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

  const theme = createTheme(themeOptions as any);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
