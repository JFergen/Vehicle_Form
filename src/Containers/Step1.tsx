import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Popover, Typography, Box } from '@mui/material';
import { NextButton } from '../Components/Buttons';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import InfoIcon from '@mui/icons-material/Info';

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
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <IconButton onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleInfoClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography variant="body1">
                After submitting the form, a representative from Certified Autoplex will reach out about your cash offer.
              </Typography>
            </Box>
          </Popover>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="VIN"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
                  <DriveEtaIcon />
                </InputAdornment>
              ),
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <NextButton loading={loading} disabled={formData.vin === ''} />
          </div>
        </form>
      </>
    );
};

export default Step1;