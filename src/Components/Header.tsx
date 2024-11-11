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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
    <>
      {/* Top info bar */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#424242',
          height: { xs: '50px', sm: '40px' },
          justifyContent: 'center'
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: '50px !important', sm: '40px !important' }, 
          display: 'flex', 
          justifyContent: 'flex-end',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          px: { xs: 2, sm: 2 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 0.5,
            pr: { xs: 5, sm: 0 }
          }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={(e) => handleIconClick(e, 'Sales Phone: 972-231-3777')}>
                <PhoneIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={(e) => handleIconClick(e, `Open Hours: ${getCurrentOpenHours()}`)}>
                <AccessTimeIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={(e) => handleIconClick(e, 'Address: 3340 Belt Line Rd, Dallas, TX')}>
                <LocationOnIcon style={{ color: '#fff' }} />
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main header */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#424242',
          height: { xs: '70px', sm: 'auto' }
        }}
      >
        <Toolbar>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            flex: isMobile ? 1 : 'auto'
          }}>
            <a href="https://www.certifiedautoplex.com" target="_blank" rel="noopener noreferrer">
              <img
                src={require('../images/CertifiedAutoplex.png')}
                alt="Logo"
                style={{
                  height: isMobile ? 45 : 50,
                  marginRight: isMobile ? 0 : 24
                }}
              />
            </a>
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ px: 3 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {navItems.map((item) => (
                <Typography 
                  key={item.label}
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: '#424242', 
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#000000'
                    }
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Keep existing Popover component */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            disableScrollLock
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

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{
          display: { xs: 'block', sm: 'none' }
        }}
        disableScrollLock
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {navItems.map((item) => (
          <MenuItem 
            key={item.label}
            onClick={handleMobileMenuClose}
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: '#424242',
              '&:hover': {
                backgroundColor: 'rgba(66, 66, 66, 0.08)'
              }
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Header;