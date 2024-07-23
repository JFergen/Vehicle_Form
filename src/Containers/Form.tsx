import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Snackbar, Alert, Grid } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { motion } from 'framer-motion';

// TODO
// 1. When inputting make/model, have list of all potential makes and then based on that, have list of all potential models (Maybe enhancement?)
// 2. Add form questions
// 3. Create more components that are being reused right now. (Think back & next buttons)

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    carModel: '',
    carYear: '',
    carMake: '',
    vin: '',
    email: '',
    phoneNumber: '',
    odometerPhoto: null,
    dashboardPhoto: null,
    frontSeatsPhoto: null,
    interiorRoofPhoto: null,
    driverFrontCornerPhoto: null,
    passengerRearCornerPhoto: null,
    smokedIn: {
      question: 'Has this vehicle been smoked in before?',
      answer: ''
    },
    mechanicalIssues: {
      question: 'Are there any mechanical issues or warning lights displayed on the dashboard?',
      answer: ''
    },
    odometerBroken: {
      question: 'Has the odometer ever been broken or replaced?',
      answer: ''
    },
    panelsNeedWork: {
      question: 'Are there any panels in need of paint or body work?',
      answer: ''
    },
    rustOrHailDamage: {
      question: 'Any major rust and/or hail damage?',
      answer: ''
    }
  });
  const [formErrors, setFormErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
  const stepVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const fetchCarInfo = async (value: string) => {
    setLoading(true);
    try {
      let response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${value}?format=json`);
      const { Make = '', Model = '', ModelYear = '', ErrorCode } = response.data.Results[0];

      setFormData((prevData) => ({
        ...prevData,
        carModel: Model,
        carMake: Make,
        carYear: ModelYear,
        vin: value
      }));
      
      if (ErrorCode !== '0') {
        handleError();
      } else {
        setFormErrors('');
        setStep(2);
      }
    } catch (error) {
      console.error(error);
      handleError();
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    setFormErrors(`Unable to fetch car information. Please check the VIN.`);
    setSnackbarMessage(`Invalid VIN entered`);
    setSnackBarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files) {
      if (!files[0]) {
        setFormErrors('Please select a file');
        return;
      }

      setFormData({
        ...formData,
        [name]: files[0],
      });

      return;
    }

    if (name === 'vin' && value.length === 17) {
      await fetchCarInfo(value);
      return;
    } else if (name === 'vin' && value.length !== 17) {
      setFormData({
        ...formData,
        carModel: '',
        vin: value
      });

      return;
    }

    // Check if the name corresponds to a nested question/answer field
    const nestedFields = ['smokedIn', 'mechanicalIssues', 'odometerBroken', 'panelsNeedWork', 'rustOrHailDamage'];
    if (nestedFields.includes(name as typeof nestedFields[number])) {
      const field = formData[name as keyof typeof formData];
      if (typeof field === 'object' && field !== null) {
        setFormData({
          ...formData,
          [name]: {
            ...field,
            answer: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
  }
  };

  const validateFirstStep = () => {
    if (!formData.vin) {
      setFormErrors('VIN is required');
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

    await fetchCarInfo(formData.vin);
  };

  const handleSecondStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSecondStep()) return;
    setStep(3)
  };

  const handleThirdStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(4)
  };

  const handleFourthStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null) {
        if (typeof value === 'object' && value.question && value.answer) {
          formDataToSend.append(`${key}_question`, value.question);
          formDataToSend.append(`${key}_answer`, value.answer);
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, value.toString());
        }
      }
    });
  
    try {
      await axios.post(`${process.env.REACT_APP_API_TO_CALL}/send-email`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        email: '',
        phoneNumber: '',
        odometerPhoto: null,
        dashboardPhoto: null,
        frontSeatsPhoto: null,
        interiorRoofPhoto: null,
        driverFrontCornerPhoto: null,
        passengerRearCornerPhoto: null,
        smokedIn: {
          question: '',
          answer: ''
        },
        mechanicalIssues: {
          question: '',
          answer: ''
        },
        odometerBroken: {
          question: '',
          answer: ''
        },
        panelsNeedWork: {
          question: '',
          answer: ''
        },
        rustOrHailDamage: {
          question: '',
          answer: ''
        }
      });
    } catch (error) {
      setSnackbarMessage('Error submitting form!');
      setSnackBarSeverity('error');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card>
            <CardContent style={{ paddingBottom: 16 }}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Step1
                    formData={formData}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    handleChange={handleChange}
                    handleSubmit={handleFirstStepSubmit}
                    loading={loading}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Step2
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSecondStepSubmit}
                    loading={loading}
                    goBack={() => setStep(1)}
                  />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={stepVariants}
                  transition={{ duration: 0.5 }}
                >
                  <Step3
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleThirdStepSubmit}
                    loading={loading}
                    goBack={() => setStep(2)}
                  />
                </motion.div>
              )}
              {step === 4 && (
                <Step4
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleFourthStepSubmit}
                  loading={loading}
                  goBack={() => setStep(3)}
                />
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