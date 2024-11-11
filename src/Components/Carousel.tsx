import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  require('../images/carouselPicOne.jpg'),
  require('../images/carouselPicTwo.jpg')
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',  // Changed from 'cover' to 'contain'
            objectPosition: 'center',
            backgroundColor: '#fafafa'  // Added background color
          }}
          alt={`Slide ${currentIndex + 1}`}
        />
      </AnimatePresence>
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