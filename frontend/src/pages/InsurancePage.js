import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper
} from '@mui/material';
import axios from 'axios';
import ML_API from '../mlapi';

const InsurancePage = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    bmi: '',
    children: '',
    smoker: '',
    region: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      // const res = await axios.post('http://localhost:5001/predict-insurance', formData);
      const res = await ML_API.post('/predict-insurance', formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error('Prediction failed', err);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '6rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center">
          Insurance Cost Prediction
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="BMI"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Children"
                name="children"
                type="number"
                value={formData.children}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Smoker"
                name="smoker"
                value={formData.smoker}
                onChange={handleChange}
                required
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <MenuItem value="northeast">Northeast</MenuItem>
                <MenuItem value="northwest">Northwest</MenuItem>
                <MenuItem value="southeast">Southeast</MenuItem>
                <MenuItem value="southwest">Southwest</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit">
                Predict
              </Button>
            </Grid>
          </Grid>
        </form>

        {prediction && (
          <Typography variant="h6" align="center" style={{ marginTop: '2rem' }}>
            Estimated Insurance Cost: <strong>{prediction}</strong>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default InsurancePage;
