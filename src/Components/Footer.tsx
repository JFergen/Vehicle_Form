import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box mt={5} textAlign="center" style={{ color: '#fff' }}>
      <Typography variant="subtitle1">
        © 2023 Vehicle Info, Inc.
      </Typography>
    </Box>
  );
};

export default Footer;