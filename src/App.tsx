import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, TextField, Button, ToggleButton, ToggleButtonGroup, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Snackbar, Alert } from '@mui/material'; // For toast messages

// TODO
// 2. When valid VIN is entered, start API and have NEXT button turn into a loading icon. It is is valid info then enable the button, if not then show toast message.
// 3. When inputting make/model, have list of all potential makes and then based on that, have list of all potential models
// 4. Cool and hip UI
// 5. Back button on 2nd page

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: theme.shape.borderRadius,
    '&:not(:first-of-type)': {
      borderLeft: 0,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '&.MuiToggleButton-root': {
      border: `1px solid ${theme.palette.divider}`
    },
  },
}));

const CarForm: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    carModel: '',
    carYear: '',
    carMake: '',
    vin: '',
    licensePlate: '',
    email: '',
  });
  const [selection, setSelection] = useState('vin');
  const [formErrors, setFormErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchCarInfo = async (type: string, value: string) => {
    setLoading(true);
    try {
      let response

      if (type === 'vin') {
        response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`);
        const { ErrorCode } = response.data.Results[0];

        if (ErrorCode !== '0') {
          console.log(ErrorCode);
          setFormErrors(`Unable to fetch car information. Please check the ${selection === 'vin' ? 'VIN' : 'License Plate'}.`);
          setSnackbarMessage(`Invalid ${selection === 'vin' ? 'VIN' : 'License Plate'} entered`);
          setSnackbarOpen(true);
        } else {
          setStep(2);
        }
      } else {
        // TODO:: License plate API
        response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`);
      }
      
      const { Make, Model, ModelYear } = response.data.Results[0];

      setFormData({
        ...formData,
        carModel: Model,
        carMake: Make,
        carYear: ModelYear,
        [type]: value
      });
    } catch (error) {
      console.log(error);
      setFormErrors(`Unable to fetch car information. Please check the ${selection === 'vin' ? 'VIN' : 'License Plate'}.`);
      setSnackbarMessage(`Invalid ${selection === 'vin' ? 'VIN' : 'License Plate'} entered`);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectionChange = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
    if (newSelection !== null) {
      setSelection(newSelection);
      setFormErrors('');
      setFormData({
        ...formData,
        vin: '',
        licensePlate: '',
      });
    }
  };

  const validateFirstStep = () => {
    if (selection === 'vin' && !formData.vin) {
      setFormErrors('VIN is required');
      return false;
    }

    if (selection === 'licensePlate' && !formData.licensePlate) {
      setFormErrors('License Plate is required');
      return false;
    }

    setFormErrors('');
    return true;
  };

  const validateSecondStep = () => {
    if (!formData.ownerName) {
      setFormErrors('Owner Name is required');
      return false;
    }

    if (!formData.email) {
      setFormErrors('Email is required');
      return false;
    }

    setFormErrors('');
    return true;
  };

  const handleFirstStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFirstStep()) return;

    const identifier = selection === 'vin' ? formData.vin : formData.licensePlate;
    const type = selection === 'vin' ? 'vin' : 'licensePlate';

    await fetchCarInfo(type, identifier);
  };

  const handleSecondStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSecondStep()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_TO_CALL}/send-email`, formData);
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Error submitting form!');
    }
  };

  return (
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            {step === 1 &&
              <>
                <StyledToggleButtonGroup
                  value={selection}
                  exclusive
                  onChange={handleSelectionChange}
                  aria-label="car information selection"
                >
                  <ToggleButton value="vin" aria-label="vin">
                    VIN
                  </ToggleButton>
                  <ToggleButton value="licensePlate" aria-label="license plate">
                    License Plate
                  </ToggleButton>     
                </StyledToggleButtonGroup>
                <form onSubmit={handleFirstStepSubmit}>
                  {selection === 'vin' && (
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
                    />
                  )}
                  {selection === 'licensePlate' && (
                    <TextField
                      label="License Plate"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      required
                      error={!!formErrors}
                      helperText={formErrors}
                    />
                  )}
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Next
                    </Button>
                  )}      
                </form>
              </>
            }
            {step === 2 &&
              <form onSubmit={handleSecondStepSubmit}>
                <TextField
                  label="Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
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
                />
                <TextField
                  label="Car Model"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
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
                />
                <TextField
                  label="Car Make"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                )}
              </form>
            }
          </CardContent>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
  );
};

export default CarForm;
