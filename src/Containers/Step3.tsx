import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { BackButton, NextButton } from '../Components/Buttons';
import PhotoUpload from '../Components/PhotoUpload';

// TODO
// 1. Use machine learning to check if it is a valid photo
// 2. Be able to review previous form entries

const Step3: React.FC<{ formData: any, handleChange: any, handleSubmit: any, loading: boolean, goBack: any }> = ({ formData, handleChange, handleSubmit, loading, goBack }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
    > 
      <Typography variant="h4" gutterBottom>
        Upload Photos
      </Typography>
      <Divider sx={{ margin: '16px 0' }} flexItem />
      <PhotoUpload
        title="Odometer"
        photo={formData.odometerPhoto}
        placeholder="odometer.jpg"
        inputId="odometer-photo"
        name="odometerPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Turn on your car before taking this photo to show any warnings."
      />
      <PhotoUpload
        title="Dashboard"
        photo={formData.dashboardPhoto}
        placeholder="dashboard.jpg"
        inputId="dashboard-photo"
        name="dashboardPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Tip: Photograph from the backseat to show all the features."
      />
      <PhotoUpload
        title="Front Seats"   
        photo={formData.frontSeatsPhoto}
        placeholder="front-seats.jpg"
        inputId="front-seats-photo"
        name="frontSeatsPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Capture any seat functions."
      />
      <PhotoUpload
        title="Interior Roof"   
        photo={formData.interiorRoofPhoto}
        placeholder="interior-roof.jpg"
        inputId="interior-roof-photo"
        name="interiorRoofPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Make sure to include the Sun or Moon roof if available."
      />
      <PhotoUpload
        title="Driver Front Corner"
        photo={formData.driverFrontCornerPhoto}
        placeholder="driver-front-corner.jpg"
        inputId="driver-front-corner-photo"
        name="driverFrontCornerPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Be sure to include the front and side in your photo."
      />
      <PhotoUpload
        title="Passenger Rear Corner"
        photo={formData.passengerRearCornerPhoto}
        placeholder="passenger-rear-corner.jpg"
        inputId="passenger-rear-corner-photo"
        name="passengerRearCornerPhoto"
        handleChange={handleChange}
        loading={loading}
        instructions="Be sure to include the back and side in your photo."
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', width: '100%' }}>
        <BackButton onClick={goBack} />
        <NextButton loading={loading} disabled={!formData.odometerPhoto || !formData.driverFrontCornerPhoto || !formData.passengerRearCornerPhoto} />
      </div>
    </Box>
  );
};

export default Step3;