import React from 'react';
import { Box, Typography, IconButton, Button, Divider, useMediaQuery } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFile from '@mui/icons-material/UploadFile';
import { useTheme } from '@mui/material/styles';

interface PhotoUploadProps {
  title: string;
  photo: File | null;
  placeholder: string;
  inputId: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  instructions: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ title, photo, placeholder, inputId, name, handleChange, loading, instructions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCameraClick = (inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={inputId}
        type="file"
        name={name}
        onChange={handleChange}
      />
      {photo ? (
        <>
          <img
            src={URL.createObjectURL(photo)}
            alt={title}
            height="200px"
            width="300px"
          />
          <Box display='flex' alignItems='center'>
            <CheckCircleIcon color='success' sx={{ marginLeft: 5 }} />
            <label htmlFor={inputId}>
              <IconButton component='span'>
                <EditIcon color='primary' />
              </IconButton>
            </label>
          </Box>
        </>
      ) : (
        <>
          <img
            src={require(`../images/${placeholder}`)}
            alt={title}
            height="200px"
            width="300px"
          />
          <Typography variant="subtitle2" gutterBottom>
            {instructions}
          </Typography>
          {isMobile ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <label htmlFor={inputId}>
                <IconButton component="span">
                  <UploadFile color='primary' />
                </IconButton>
              </label>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id={`${inputId}-camera`}
                type="file"
                name={name}
                onChange={handleChange}
                capture="environment"
              />
              <IconButton component="span" onClick={() => handleCameraClick(`${inputId}-camera`)}>
                <PhotoCamera color='primary' />
              </IconButton>
            </Box>
          ) : (
            <label htmlFor={inputId}>
              <Button
                variant="contained"
                color="primary"
                component='span'
                sx={{ textTransform: 'none' }}
              >
                Upload {title} Photo
              </Button>
            </label>
          )}
        </>
      )}
      <Divider sx={{ margin: '16px 0' }} flexItem />
    </>
  );
};

export default PhotoUpload;