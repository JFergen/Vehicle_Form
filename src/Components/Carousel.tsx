import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import images directly - adjust these paths to match your project structure
import carouselPicOne from '../images/carouselPicOne.jpg';
import carouselPicTwo from '../images/carouselPicTwo.jpg';

// Create array after imports
const images = [carouselPicOne, carouselPicTwo];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.5)' }
        }}
      >
        <ArrowBackIosIcon sx={{ color: 'white' }} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.5)' }
        }}
      >
        <ArrowForwardIosIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>
  );
};

export default Carousel; 