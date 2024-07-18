import React from 'react';
import { Typography, Box } from '@mui/material';

interface ReviewInfoProps {
  formData: {
    ownerName: string;
    email: string;
    phoneNumber: string;
    carModel: string;
    carYear: string;
    carMake: string;
  };
}

const ReviewInfo: React.FC<ReviewInfoProps> = ({ formData }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Name:</strong> {formData.ownerName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {formData.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Phone Number:</strong> {formData.phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Car Model:</strong> {formData.carModel}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Car Year:</strong> {formData.carYear}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Car Make:</strong> {formData.carMake}
      </Typography>
    </Box>
  );
};

export default ReviewInfo;