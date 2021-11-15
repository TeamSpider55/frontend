import { CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
  dark?: boolean;
}

const Spinner = ({ dark = false }: Props) => (
  <CircularProgress
    size="1.5rem"
    sx={{ color: dark ? 'black' : 'white' }}
  />
);

Spinner.defaultProps = {
  dark: false,
};

export default Spinner;
