import React from 'react';
import { TextField, Button, CircularProgress, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const Step2: React.FC<{ formData: any, handleChange: any, handleSubmit: any, loading: boolean, goBack: any }> = ({ formData, handleChange, handleSubmit, loading, goBack }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        type="tel"
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Car Model"
        name="carModel"
        value={formData.carModel}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsCarIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Car Year"
        name="carYear"
        value={formData.carYear}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Car Make"
        name="carMake"
        value={formData.carMake}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsCarIcon />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={goBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            disabled={
              formData.carModel === '' ||
              formData.carYear === '' ||
              formData.carMake === '' ||
              formData.ownerName === '' ||
              formData.email === ''
            }
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Step2;