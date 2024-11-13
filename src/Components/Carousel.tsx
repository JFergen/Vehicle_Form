import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Import images directly - adjust these paths to match your project structure
import carouselPicOne from '../images/carouselPicOne.jpg';
import carouselPicTwo from '../images/carouselPicTwo.jpg';

const images = [carouselPicOne, carouselPicTwo];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = container.scrollLeft + container.offsetWidth;
        container.scroll({
          left: scrollAmount,
          behavior: 'smooth'
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isMobile]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (isMobile) {
    return (
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          position: 'relative',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '20px',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))',
            pointerEvents: 'none'
          }
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 100%',
              scrollSnapAlign: 'center',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

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