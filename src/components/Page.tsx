import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Page = ({ children, title = '' }: Props) => (
  <Box>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
);

export default Page;
