import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Grid, useTheme, useMediaQuery } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { motion, useInView } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Create refs for the title and each card section
  const titleRef = useRef(null);
  const cardRef1 = useRef(null);
  const cardRef2 = useRef(null);
  const cardRef3 = useRef(null);
  
  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isCard1InView = useInView(cardRef1, { once: true, amount: 0.3 });
  const isCard2InView = useInView(cardRef2, { once: true, amount: 0.3 });
  const isCard3InView = useInView(cardRef3, { once: true, amount: 0.3 });

  const cardRefs = [cardRef1, cardRef2, cardRef3];
  const cardInViews = [isCard1InView, isCard2InView, isCard3InView];

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
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
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

        <Typography
          variant="h6"
          align="center"
          sx={{
            mt: 1,
            mb: 4,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          If we don't meet or beat Carmax offer we'll write you a check for $500
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              ref={cardRefs[index]}
              initial={{ opacity: 0, y: 50 }}
              animate={cardInViews[index] ? 
                { opacity: 1, y: 0 } : 
                { opacity: 0, y: 50 }
              }
              whileHover={!isMobile ? { scale: 1.05 } : undefined}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => !isMobile && setHoveredCard(index)}
              onHoverEnd={() => !isMobile && setHoveredCard(null)}
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
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <motion.div
                  animate={isMobile ? 
                    (cardInViews[index] ? { rotateY: 360 } : { rotateY: 0 }) :
                    (hoveredCard === index ? { rotateY: 360 } : { rotateY: 0 })}
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography variant="body1" sx={{ color: theme.palette.text.primary, mt: 2 }}>
                    {step.benefit}
                  </Typography>
                </motion.div>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;