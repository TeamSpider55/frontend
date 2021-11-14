import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Typography,
} from '@mui/material';

interface Props {
  selected: string[];
}

const ContactListToolbar = (
  {
    selected,
  }: Props,
) => {
  const theme = useTheme();

  return (
    <Box
      component={Toolbar}
      display="flex"
      justifyContent="space-between"
      padding={theme.spacing(1)}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {`${selected.length} selected`}
        </Typography>
      ) : null}
    </Box>
  );
};

export default ContactListToolbar;
