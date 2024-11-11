import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, useTheme, useMediaQuery } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { motion, AnimatePresence } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const steps = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      title: "Quick VIN Entry",
      description: "Enter your VIN once, we'll handle the rest",
      benefit: "Save time with automatic vehicle lookup"
    },
    {
      icon: <PhotoCameraIcon sx={{ fontSize: 40 }} />,
      title: "Simple Photo Upload",
      description: "Snap a few photos of your vehicle",
      benefit: "Get an accurate offer based on actual condition"
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      title: "Instant Processing",
      description: "Our team reviews and responds quickly",
      benefit: "No waiting or haggling required"
    }
  ];

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: 4,
            background: 'linear-gradient(45deg, #424242 30%, #757575 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Get Your Cash Offer Today
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
            >
              <Paper
                elevation={hoveredCard === index ? 8 : 2}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease-in-out',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(66, 66, 66, 0.05) 0%, rgba(117, 117, 117, 0.05) 100%)',
                    zIndex: 0,
                  }
                }}
              >
                <motion.div
                  animate={{
                    rotateY: hoveredCard === index ? 360 : 0
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ color: theme.palette.primary.main, marginBottom: '1rem' }}
                >
                  {step.icon}
                </motion.div>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {step.title}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {step.description}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  {step.benefit}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;