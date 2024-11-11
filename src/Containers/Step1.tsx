import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Popover, Typography, Box, Paper } from '@mui/material';
import { NextButton } from '../Components/Buttons';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';

const Step1: React.FC<{ formData: any, formErrors: any, setFormErrors: any, handleChange: any, handleSubmit: any, loading: boolean }> = ({ formData, formErrors, setFormErrors, handleChange, handleSubmit, loading }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleInfoClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <
        >
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 500, mb: 3 }}>
            Enter Your Vehicle's VIN
          </Typography>
          
          <Typography variant="body2" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
            Found on your dashboard near the windshield or driver's side door
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Vehicle Identification Number (VIN)"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              error={!!formErrors}
              helperText={formErrors}
              onBlur={() => {
                if (formData.vin.length > 0 && formData.vin.length !== 17) {
                  setFormErrors('VIN must be 17 characters long');
                } else {
                  setFormErrors('');
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveEtaIcon color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: '2px',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em'
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <IconButton 
                onClick={handleInfoClick}
                sx={{ 
                  color: 'primary.main',
                  '&:hover': { backgroundColor: 'rgba(66, 66, 66, 0.08)' }
                }}
              >
                <InfoIcon />
              </IconButton>
              <NextButton loading={loading} disabled={formData.vin === ''} />
            </Box>
          </form>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleInfoClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box p={2} maxWidth={300}>
              <Typography variant="body2">
                Your VIN is a unique 17-character code that identifies your vehicle. 
                It can typically be found on your dashboard near the windshield or on 
                the driver's side door jamb.
              </Typography>
            </Box>
          </Popover>
        </>
      </motion.div>
    );
};

export default Step1;