import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box mt={5} textAlign="center" style={{ color: '#fff' }}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Typography variant="subtitle1">
          © 2024 Certified Autoplex.
        </Typography>
        <Button
          variant="text"
          style={{ color: '#FFFFFF', textTransform: 'none' }}
          onClick={() => window.location.href = 'mailto:josephfergen150@gmail.com'}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;