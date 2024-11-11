import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Grid, Typography, Divider } from '@mui/material';
import { BackButton, NextButton } from '../Components/Buttons';

const Step4: React.FC<{ formData: any, handleChange: any, handleSubmit: any, loading: boolean, goBack: any }> = ({ formData, handleChange, handleSubmit, loading, goBack }) => {
  const canSubmit = formData.smokedIn.answer && formData.mechanicalIssues.answer && formData.odometerBroken.answer && formData.panelsNeedWork.answer && formData.rustOrHailDamage.answer;

  return (
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
        Final Questions
      </Typography>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
                  {formData.smokedIn.question}
              </FormLabel>
              <RadioGroup name="smokedIn" value={formData.smokedIn.answer} onChange={handleChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
                  {formData.mechanicalIssues.question}
              </FormLabel>
              <RadioGroup name="mechanicalIssues" value={formData.mechanicalIssues.answer} onChange={handleChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
                  {formData.odometerBroken.question}
              </FormLabel>
              <RadioGroup name="odometerBroken" value={formData.odometerBroken.answer} onChange={handleChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
                  {formData.panelsNeedWork.question}
              </FormLabel>
              <RadioGroup name="panelsNeedWork" value={formData.panelsNeedWork.answer} onChange={handleChange}>
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes, 1" control={<Radio />} label="Yes, 1" />
                <FormControlLabel value="Yes, 2" control={<Radio />} label="Yes, 2" />
                <FormControlLabel value="Yes, 3+" control={<Radio />} label="Yes, 3+" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, color: 'black' }}>
                  {formData.rustOrHailDamage.question}
              </FormLabel>
              <RadioGroup name="rustOrHailDamage" value={formData.rustOrHailDamage.answer} onChange={handleChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BackButton onClick={goBack} />
            <NextButton
              loading={loading}
              disabled={!canSubmit}
              buttonText="Submit"
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Step4;