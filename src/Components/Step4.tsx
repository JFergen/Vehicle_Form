import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button, CircularProgress, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const Step4: React.FC<{ formData: any, handleChange: any, handleSubmit: any, loading: boolean, goBack: any }> = ({ formData, handleChange, handleSubmit, loading, goBack }) => {
  const canSubmit = formData.smokedIn && formData.mechanicalIssues && formData.odometerBroken && formData.panelsNeedWork && formData.rustOrHailDamage;

  return (
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
          <Button variant="contained" color="primary" onClick={goBack} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} disabled={!canSubmit}>
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Step4;