import React from 'react';
import { Box, Typography } from '@mui/material';

const HowItWorks: React.FC = () => {
  return (
    <Box mt={5} mb={5} textAlign="center">
      <Typography variant="h4" gutterBottom>How It Works</Typography>
      <Typography variant="body1">
        1. Input your vehicle information in the provided form.
      </Typography>
      <Typography variant="body1">
        2. A representative from Certified Autoplex will reach out to you with a cash offer for your vehicle.
      </Typography>
    </Box>
  );
};

export default HowItWorks;