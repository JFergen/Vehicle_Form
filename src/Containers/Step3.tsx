import React from 'react';
import { Button, Typography, Box, Divider, IconButton, useMediaQuery } from '@mui/material';
import { BackButton, NextButton } from '../Components/Buttons';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFile from '@mui/icons-material/UploadFile';
import { useTheme } from '@mui/material/styles';

// TODO
// 1. Use machine learning to check if it is a valid photo
// 2. Be able to review previous form entries
// 3. Change to use re-usable component for each photo and buttons

const Step3: React.FC<{ formData: any, handleChange: any, handleSubmit: any, loading: boolean, goBack: any }> = ({ formData, handleChange, handleSubmit, loading, goBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCameraClick = (inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };

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
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Odometer
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="odometer-photo"
        type="file"
        name="odometerPhoto"
        onChange={handleChange}
      />
      {formData.odometerPhoto ? (
        <>
          <img
            src={URL.createObjectURL(formData.odometerPhoto)}
            alt="odometer"
            height="150px"
            width="300px"
          />
          <Box display='flex' alignItems='center'>
            <CheckCircleIcon color='success' sx={{ marginLeft: 5 }} />
            <label htmlFor="odometer-photo">
              <IconButton component='span'>
                <EditIcon color='primary'/>
              </IconButton>
            </label>
          </Box>
        </>        
      ) : (
        <>
          <img
            src={require('../images/odometer.jpg')}
            alt="odometer"
            height="150px"
            width="300px"
          />
          <Typography variant="subtitle2" gutterBottom>
            Turn on your car before taking this photo to show any warnings.
          </Typography>         
          {isMobile ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <label htmlFor="odometer-photo">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
              </label>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="odometer-photo-camera"
                type="file"
                name="odometerPhoto"
                onChange={handleChange}
                capture="environment"
              />
              <IconButton component="span" onClick={() => handleCameraClick('odometer-photo-camera')}>
                <PhotoCamera color='primary' />
              </IconButton>
            </Box>
          ) : (
            <label htmlFor='odometer-photo'>
            <Button
              variant="contained"
              color="primary"
              component='span'
              sx={{ textTransform: 'none' }}
            >
              Upload Odometer Photo
            </Button>
            </label>
          )}
        </>
      )}
      <Divider sx={{ margin: '16px 0' }} flexItem />
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Driver Front Corner
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="driver-front-corner-photo"
        type="file"
        name="driverFrontCornerPhoto"
        onChange={handleChange}
      />
      {formData.driverFrontCornerPhoto ? (
        <>
          <img
            src={URL.createObjectURL(formData.driverFrontCornerPhoto)}
            alt="driver front corner"
            height="150px"
            width="300px"
          />
          <Box display='flex' alignItems='center'>
            <CheckCircleIcon color='success' sx={{ marginLeft: 5 }} />
            <label htmlFor="driver-front-corner-photo">
              <IconButton component='span'>
                <EditIcon color='primary' />
              </IconButton>
            </label>
          </Box>  
        </>        
      ) : (
        <>
          <img
            src={require('../images/driver-front-corner.png')}
            alt="driver front corner"
            height="150px"
            width="300px"
          />
          <Typography variant="subtitle2" gutterBottom>
            Be sure to include the front and side in your photo.
          </Typography>
          {isMobile ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <label htmlFor="driver-front-corner-photo">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
              </label>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="driver-front-corner-photo-camera"
                type="file"
                name="driverFrontCornerPhoto"
                onChange={handleChange}
                capture='environment'
              />
              <IconButton component="span" onClick={() => handleCameraClick('driver-front-corner-photo-camera')}>
                <PhotoCamera color='primary' />
              </IconButton>
            </Box>
          ) : (
            <label htmlFor='driver-front-corner-photo'>
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ textTransform: 'none' }}
              >
                Upload Driver Front Corner Photo
              </Button>
            </label>
          )}
        </>
      )}
      <Divider sx={{ margin: '16px 0' }} flexItem />
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Passenger Rear Corner
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="passenger-rear-corner-photo"
        type="file"
        name="passengerRearCornerPhoto"
        onChange={handleChange}
      />
      {formData.passengerRearCornerPhoto ? (
        <>
          <img
            src={URL.createObjectURL(formData.passengerRearCornerPhoto)}
            alt="passenger rear corner"
            height="150px"
            width="300px"
          />
          <Box display='flex' alignItems='center'>
            <CheckCircleIcon color='success' sx={{ marginLeft: 5 }} />
            <label htmlFor="passenger-rear-corner-photo">
              <IconButton component='span'>
                <EditIcon color='primary' />
              </IconButton>
            </label>
          </Box>
        </>        
      ) : (
        <>
          <img
            src={require('../images/passenger-rear-corner.png')}
            alt="passenger rear corner"
            height="200px"
            width="300px"
          />
          <Typography variant="subtitle2" gutterBottom>
            Be sure to include the back and side in your photo.
          </Typography>
          {isMobile ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <label htmlFor="passenger-rear-corner-photo">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
              </label>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="driver-rear-corner-photo-camera"
                type="file"
                name="driverFrontCornerPhoto"
                onChange={handleChange}
                capture='environment'
              />
              <IconButton component="span" onClick={() => handleCameraClick('passenger-rear-corner-photo-camera')}>
                <PhotoCamera color='primary' />
              </IconButton>
            </Box>
          ) : (
            <label htmlFor="passenger-rear-corner-photo">
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ textTransform: 'none' }}
              >
                Upload Passenger Rear Corner Photo
              </Button>
            </label>
          )}
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', width: '100%' }}>
        <BackButton onClick={goBack} />
        <NextButton loading={loading} disabled={!formData.odometerPhoto || !formData.driverFrontCornerPhoto || !formData.passengerRearCornerPhoto} />
      </div>
    </Box>
  );
};

export default Step3;