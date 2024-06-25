import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, TextField, Button, ToggleButton, ToggleButtonGroup, CircularProgress, Select,
  MenuItem, InputLabel, FormControl, SelectChangeEvent, InputAdornment, Snackbar, Alert, Grid, useMediaQuery,
  IconButton, Popover, Typography, Box } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
// import HowItWorks from './HowItWorks';
import { styled, useTheme } from '@mui/material/styles';

// TODO
// 1. When inputting make/model, have list of all potential makes and then based on that, have list of all potential models (Maybe enhancement?)

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: theme.shape.borderRadius,
    '&:not(:first-of-type)': {
      borderLeft: 0,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    '&.MuiToggleButton-root': {
      border: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    carModel: '',
    carYear: '',
    carMake: '',
    vin: '',
    licensePlate: '',
    state: '',
    email: '',
    phoneNumber: ''
  });
  const [selection, setSelection] = useState('vin');
  const [formErrors, setFormErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const states = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ];

  const fetchCarInfo = async (type: string, value: string, stateValue?: string) => {
    setLoading(true);
    try {
      let response;

      if (type === 'vin') {
        response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`);
      } else {
        const url = "https://platetovin.com/api/convert";
        const headers = {
          'Authorization': 'TmQT6D4jy6uhVHr',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        };
        const body = {
          plate: value,
          state: stateValue,
        };
        response = await axios.post(url, body, { headers });
      }

      if (type === 'vin') {
        const { Make = '', Model = '', ModelYear = '', ErrorCode } = response.data.Results[0];

        setFormData((prevData) => ({
          ...prevData,
          carModel: Model,
          carMake: Make,
          carYear: ModelYear,
          [type]: value,
        }));

        if (ErrorCode !== '0') {
          handleError(type);
        } else {
          setFormErrors('');
          setStep(2);
        }
      } else {
        const { make = '', model = '', year = '', trim = '', vin } = response.data.vin;

        setFormData((prevData) => ({
          ...prevData,
          carModel: model,
          carMake: make,
          carYear: year,
          carTrim: trim,
          vin: vin,
          licensePlate: value,
        }));

        if (!vin) {
          handleError(type);
        } else {
          setFormErrors('');
          setStep(2);
        }
      }
    } catch (error) {
      console.error(error);
      handleError(type);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (type: string) => {
    const identifier = type === 'vin' ? 'VIN' : 'License Plate';
    setFormErrors(`Unable to fetch car information. Please check the ${identifier}.`);
    setSnackbarMessage(`Invalid ${identifier} entered`);
    setSnackBarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'vin' && value.length === 17) {
      await fetchCarInfo('vin', value);
      return;
    } else if (name === 'vin' && value.length !== 17) {
      setFormData({
        ...formData,
        carModel: '',
        [name]: value,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const name = event.target.name as string;
    const value = event.target.value as string;

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
        carModel: '',
        licensePlate: '',
        state: '',
      });
    }
  };

  const validateFirstStep = () => {
    if (selection === 'vin' && !formData.vin) {
      setFormErrors('VIN is required');
      return false;
    }

    if (selection === 'licensePlate' && (!formData.licensePlate || !formData.state)) {
      setFormErrors('License Plate and State are required');
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

    if (!formData.phoneNumber) {
      setFormErrors('Phone Number is required');
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

    await fetchCarInfo(type, identifier, formData.state);
  };

  const handleSecondStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSecondStep()) return;
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_TO_CALL}/send-email`, formData);
      setSnackbarMessage('Form submitted successfully!');
      setSnackBarSeverity('success');
      setSnackbarOpen(true);
      setLoading(false);
      setStep(1);
      setFormData({
        ownerName: '',
        carModel: '',
        carYear: '',
        carMake: '',
        vin: '',
        licensePlate: '',
        state: '',
        email: '',
        phoneNumber: ''
      });
    } catch (error) {
      setSnackbarMessage('Error submitting form!');
      setSnackBarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'how-it-works-popover' : undefined;

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card>
            <CardContent>
              {step === 1 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <StyledToggleButtonGroup
                      value={selection}
                      exclusive
                      onChange={handleSelectionChange}
                      aria-label="car information selection"
                      style={{ marginBottom: 0 }}
                    >
                      <ToggleButton value="vin" aria-label="vin">
                        VIN
                      </ToggleButton>
                      <ToggleButton value="licensePlate" aria-label="license plate" style={{ textTransform: 'none' }}>
                        License Plate
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                    <IconButton aria-describedby={id} onClick={handleInfoClick}>
                      <InfoIcon />
                    </IconButton>
                    <Popover
                      id={id}
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DriveEtaIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {selection === 'licensePlate' && (
                      <>
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
                        <FormControl fullWidth margin="normal" required error={!!formErrors}>
                          <InputLabel id="state-label">State</InputLabel>
                          <Select
                            labelId="state-label"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleSelectChange}
                            label="State"
                          >
                            {states.map((state) => (
                              <MenuItem key={state.value} value={state.value}>
                                {state.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {formErrors && <p style={{ color: 'red' }}>{formErrors}</p>}
                        </FormControl>
                      </>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          endIcon={<SendIcon />}
                          disabled={
                            (selection === 'vin' && formData.carModel === '') ||
                            (selection === 'licensePlate' && (formData.licensePlate === '' || formData.state === ''))
                          }
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </form>
                </>
              )}
              {step === 2 && (
                <form onSubmit={handleSecondStepSubmit}>
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
                      onClick={() => setStep(1)}
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
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackBarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Form;
