import React from 'react';
import { Button, CircularProgress, Typography, Box, Divider, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFile from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

// TODO
// 1. Use machine learning to check if it is a valid photo
// 2. Be able to review previous form entries

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
        capture="environment"
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
          <label htmlFor="odometer-photo">
            {isMobile ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
                <IconButton component="span" onClick={() => handleCameraClick('odometer-photo')}>
                  <PhotoCamera color='primary' />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component='span'
                sx={{ textTransform: 'none' }}
              >
                Upload Odometer Photo
              </Button>
            )}
          </label>
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
        capture="environment"
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
          <label htmlFor="driver-front-corner-photo">
            {isMobile ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
                <IconButton component="span" onClick={() => handleCameraClick('driver-front-corner-photo')}>
                  <PhotoCamera color='primary' />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ textTransform: 'none' }}
              >
                Upload Driver Front Corner Photo
              </Button>
            )}
          </label>
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
        capture="environment"
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
            height="150px"
            width="300px"
          />
          <Typography variant="subtitle2" gutterBottom>
            Be sure to include the back and side in your photo.
          </Typography>
          <label htmlFor="passenger-rear-corner-photo">
            {isMobile ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
                <IconButton component="span" onClick={() => handleCameraClick('passenger-rear-corner-photo')}>
                  <PhotoCamera color='primary' />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ textTransform: 'none' }}
              >
                Upload Passenger Rear Corner Photo
              </Button>
            )}
          </label>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.odometerPhoto || !formData.driverFrontCornerPhoto || !formData.passengerRearCornerPhoto}
            endIcon={<SendIcon />}
          >
            Next
          </Button>
        )}
      </div>
    </Box>
  );
};

export default Step3;