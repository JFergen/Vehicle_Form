import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Popover, 
  useMediaQuery, 
  useTheme,
  Button,
  Menu,
  MenuItem 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverContent, setPopoverContent] = useState<string>('');
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navItems = [
    { label: 'Home', url: 'https://www.certifiedautoplex.com' },
    { label: 'Inventory', url: 'https://www.certifiedautoplex.com/used-vehicles-dallas-tx' },
    { label: 'Warranty', url: 'https://www.certifiedautoplex.com/our-warranty' },
    { label: 'Pay Online', url: 'https://www.certifiedautoplex.com/payonline' },
    { label: 'Finance', url: 'https://www.certifiedautoplex.com/car-loans-in-dallas-tx' },
    { label: 'About Us', url: 'https://www.certifiedautoplex.com/about-certified-autoplex-in-dallas-tx' },
    { label: 'Trade/Sell', url: 'https://www.certifiedautoplex.com/edmunds-trade-in' },
  ];

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

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="static" style={{ background: 'linear-gradient(to right, #ff0000, #000000)' }}>
      <Toolbar sx={{ flexDirection: 'column', padding: 0 }}>
        {/* Top Bar with Logo and Icons */}
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center" px={2} py={1}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && "Owned and Operated by"} 
              <a href="https://www.certifiedautoplex.com" target="_blank" rel="noopener noreferrer">
                <img
                  src={require('../images/CertifiedAutoplex.png')}
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

        {/* Navigation Bar */}
        <Box 
          width="100%" 
          bgcolor="rgba(0, 0, 0, 0.1)"
          display="flex"
          justifyContent="center"
          px={2}
        >
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                {navItems.map((item) => (
                  <MenuItem 
                    key={item.label}
                    onClick={() => {
                      window.location.href = item.url;
                      handleMobileMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box display="flex" gap={2}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        {/* Keep existing Popover component */}
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