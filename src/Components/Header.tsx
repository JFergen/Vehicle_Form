import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Popover, useMediaQuery, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<string>('');

  const handleIconClick = (event: React.MouseEvent<HTMLElement>, content: string) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(content);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverContent('');
  };

  const getCurrentOpenHours = () => {
    const hours = {
      'Sunday': 'Closed',
      'Monday': '10 AM–7 PM',
      'Tuesday': '10 AM–7 PM',
      'Wednesday': '10 AM–7 PM',
      'Thursday': '10 AM–7 PM',
      'Friday': '10 AM–7 PM',
      'Saturday': '9 AM–5 PM',
    };
    const today = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', weekday: 'long' }) as keyof typeof hours;
    return `${today}: ${hours[today]}`;
  };

  return (
    <AppBar position="static" style={{ background: 'linear-gradient(to right, #ff0000, #000000)' }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && "Owned and Operated by"} 
              <a href="https://www.certifiedautoplex.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/CertifiedAutoplex.png"
                  alt="Logo"
                  style={{
                    height: 40,
                    marginLeft: isMobile ? 0 : 10,
                    marginTop: isMobile ? 10 : 0,
                    padding: 5,
                    backgroundColor: 'white'
                  }}
                />
              </a>
            </Typography>
          </motion.div>
          <Box display="flex" alignItems="center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton onClick={(e) => handleIconClick(e, 'Address: 3340 Belt Line Rd, Dallas, TX')}>
                <LocationOnIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton onClick={(e) => handleIconClick(e, `Open Hours: ${getCurrentOpenHours()}`)}>
                <AccessTimeIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton onClick={(e) => handleIconClick(e, 'Sales Phone: 972-231-3777')}>
                <PhoneIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {popoverContent.includes('Address') ? (
            <Typography sx={{ p: 2 }}>
              Address: <a href="https://www.google.com/maps/search/?api=1&query=Certified+Autoplex,+Dallas,+TX" target="_blank" rel="noopener noreferrer">
                3340 Belt Line Rd, Dallas, TX
              </a>
            </Typography>
          ) : popoverContent.includes('Phone') ? (
            <Typography sx={{ p: 2 }}>
              Sales Phone: <a href="tel:972-231-3777">972-231-3777</a>
            </Typography>
          ) : (
            <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
          )}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;