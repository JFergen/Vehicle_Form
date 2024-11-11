import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Popover, Typography, Box, Divider } from '@mui/material';
import { NextButton } from '../Components/Buttons';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useMediaQuery } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import BarcodeScanner from '../Components/BarcodeScanner';

const Step1: React.FC<{ formData: any, formErrors: any, setFormErrors: any, handleChange: any, handleSubmit: any, loading: boolean }> = ({ formData, formErrors, setFormErrors, handleChange, handleSubmit, loading }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleInfoClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleScan = (result: string) => {
      const event = {
        target: {
          name: 'vin',
          value: result
        }
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(event);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <>
          <Typography 
            variant="h4" 
            gutterBottom 
            align="center"
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2.125rem' },
              lineHeight: { xs: 1.2, sm: 1.235 },
              whiteSpace: { xs: 'normal', sm: 'nowrap' }
            }}
          >
            Enter Your Vehicle's VIN
          </Typography>
          <Divider sx={{ mb: 2, mt: 2 }} />
          
          <Typography variant="body2" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
            Found on your dashboard near the windshield or driver's side door
          </Typography>

          <Box sx={{ position: 'relative' }}>
            <AnimatePresence>
              {!isInputFocused && formData.vin === '' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: -40,
                    zIndex: 1
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <KeyboardDoubleArrowDownIcon 
                      sx={{ 
                        fontSize: 40,
                        color: 'primary.main',
                        filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
                      }} 
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <TextField
                  label="Vehicle Identification Number (VIN)"
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={(e) => {
                    setIsInputFocused(false);
                    if (e.target.value.length > 0 && e.target.value.length !== 17) {
                      setFormErrors('VIN must be 17 characters long');
                    } else {
                      setFormErrors('');
                    }
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  error={!!formErrors}
                  helperText={formErrors}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DriveEtaIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: isMobile && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setIsScannerOpen(true)}
                          edge="end"
                          color="primary"
                        >
                          <QrCodeScannerIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      }
                    }
                  }}
                />
              </motion.div>
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
          </Box>

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

          <BarcodeScanner
            open={isScannerOpen}
            onClose={() => setIsScannerOpen(false)}
            onScan={handleScan}
          />
        </>
      </motion.div>
    );
};

export default Step1;