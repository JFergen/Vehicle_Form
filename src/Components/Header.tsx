import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Popover, useMediaQuery, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';

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
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          {!isMobile && <Typography variant="h6">Vehicle Information Form</Typography>}
          <Box display="flex" alignItems="center">
            <IconButton onClick={(e) => handleIconClick(e, 'Address: 3340 Belt Line Rd, Dallas, TX')}>
              <LocationOnIcon />
            </IconButton>
            <IconButton onClick={(e) => handleIconClick(e, `Open Hours: ${getCurrentOpenHours()}`)}>
              <AccessTimeIcon />
            </IconButton>
            <IconButton onClick={(e) => handleIconClick(e, 'Sales Phone: 972-231-3777')}>
              <PhoneIcon />
            </IconButton>
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
              Address: <a href="geo:3340 Belt Line Rd, Dallas, TX" target="_blank" rel="noopener noreferrer">
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