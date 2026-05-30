import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Button,
  Alert
} from '@mui/material';
import axios from 'axios';
import API from '../api'; // adjust path if needed

// Diabetes Form
const DiabetesForm = ({ onPredict }) => {
  const fields = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];
  const [values, setValues] = useState({});
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setErrorFields(errorFields.filter(error => error !== field)); // Clear error when the field is filled
  };

  const handleSubmit = () => {
    const missingFields = fields.filter(field => !values[field]);
    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      document.getElementsByName(missingFields[0])[0].focus(); // Focus on the first missing field
    } else {
      onPredict(Object.values(values), 'Diabetes');
    }
  };

  return (
    <Box mt={2}>
      {fields.map(label => (
        <TextField
          key={label}
          name={label}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          value={values[label] || ''}
          onChange={(e) => handleChange(label, e.target.value)}
          required
          error={errorFields.includes(label)}
          helperText={errorFields.includes(label) ? `Please enter ${label}` : `Enter ${label}`}
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Predict</Button>
    </Box>
  );
};

// Heart Disease Form
const HeartDiseaseForm = ({ onPredict }) => {
  const fields = [
    { label: 'Age', helper: 'Enter age in years' },
    { label: 'Sex', helper: '1 = male; 0 = female' },
    { label: 'CP', helper: 'Chest pain type (0–3)' },
    { label: 'Trestbps', helper: 'Resting blood pressure (in mm Hg)' },
    { label: 'Chol', helper: 'Serum cholesterol in mg/dL' },
    { label: 'Fbs', helper: 'Fasting blood sugar > 120 mg/dL (1 = true; 0 = false)' },
    { label: 'Restecg', helper: 'Resting ECG results (0–2)' },
    { label: 'Thalach', helper: 'Maximum heart rate achieved' },
    { label: 'Exang', helper: 'Exercise-induced angina (1 = yes; 0 = no)' },
    { label: 'Oldpeak', helper: 'ST depression induced by exercise' },
    { label: 'Slope', helper: 'Slope of the peak exercise ST segment (0–2)' },
    { label: 'Ca', helper: 'Number of major vessels (0–3)' },
    { label: 'Thal', helper: 'Thalassemia (3 = normal; 6 = fixed defect; 7 = reversible defect)' },
  ];
  const [values, setValues] = useState({});
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setErrorFields(errorFields.filter(error => error !== field)); // Clear error when the field is filled
  };

  const handleSubmit = () => {
    const missingFields = fields.filter(({ label }) => !values[label]);
    if (missingFields.length > 0) {
      setErrorFields(missingFields.map(({ label }) => label));
      document.getElementsByName(missingFields[0].label)[0].focus(); // Focus on the first missing field
    } else {
      onPredict(Object.values(values), 'Heart Disease');
    }
  };

  return (
    <Box mt={2}>
      {fields.map(({ label, helper }) => (
        <TextField
          key={label}
          name={label}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          value={values[label] || ''}
          onChange={(e) => handleChange(label, e.target.value)}
          required
          error={errorFields.includes(label)}
          helperText={errorFields.includes(label) ? `Please enter ${label}` : helper}
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Predict</Button>
    </Box>
  );
};

// Parkinson's Disease Form
const ParkinsonsDiseaseForm = ({ onPredict }) => {
  const fields = [
    'MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)', 'MDVP:Jitter(%)', 'MDVP:Jitter(Abs)',
    'MDVP:RAP', 'MDVP:PPQ', 'Jitter:DDP', 'MDVP:Shimmer', 'MDVP:Shimmer(dB)', 'Shimmer:APQ3',
    'Shimmer:APQ5', 'MDVP:APQ', 'Shimmer:DDA', 'NHR', 'HNR', 'RPDE', 'DFA', 'spread1',
    'spread2', 'D2', 'PPE'
  ];
  const [values, setValues] = useState({});
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    setErrorFields(errorFields.filter(error => error !== field)); // Clear error when the field is filled
  };

  const handleSubmit = () => {
    const missingFields = fields.filter(field => !values[field]);
    if (missingFields.length > 0) {
      setErrorFields(missingFields);
      document.getElementsByName(missingFields[0])[0].focus(); // Focus on the first missing field
    } else {
      onPredict(Object.values(values), 'Parkinsons Disease');
    }
  };

  return (
    <Box mt={2}>
      {fields.map(label => (
        <TextField
          key={label}
          name={label}
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          value={values[label] || ''}
          onChange={(e) => handleChange(label, e.target.value)}
          required
          error={errorFields.includes(label)}
          helperText={errorFields.includes(label) ? `Please enter ${label}` : `Enter ${label}`}
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Predict</Button>
    </Box>
  );
};

// Main Component
const Additional = () => {
  const [disease, setDisease] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setDisease(event.target.value);
    setPrediction(null); // Reset prediction on disease change
    setError(''); // Reset error on disease change
  };

  const handlePredict = async (data, selectedDisease) => {
    try {
        console.log(selectedDisease);
        console.log(data);
      setError(''); // Reset error message before making a request
      // const response = await axios.post(`http://localhost:5000/api/${selectedDisease.toLowerCase().replace(' ', '')}`, data);
      const endpoint = selectedDisease.toLowerCase().replace(/\s+/g, '');

      const response = await API.post(`/api/${endpoint}`, data);
    
      setPrediction(response.data.prediction); // Assuming the response contains the prediction data
      //console.log(response.data);
      
    } catch (error) {
      setError('Error fetching prediction. Please try again.');
      console.error('Prediction error:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '6rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Please Select What Disease You Want to Check
      </Typography>
      <Box mt={2} p={2} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem' }}>
          <InputLabel id="disease-select-label">Select Disease</InputLabel>
          <Select
            labelId="disease-select-label"
            value={disease}
            onChange={handleChange}
            label="Select Disease"
          >
            <MenuItem value="Diabetes">Diabetes</MenuItem>
            <MenuItem value="Heart Disease">Heart Disease</MenuItem>
            <MenuItem value="Parkinsons Disease">Parkinson's Disease</MenuItem>
          </Select>
        </FormControl>

        {/* Render form based on disease selection */}
        {disease === 'Diabetes' && <DiabetesForm onPredict={handlePredict} />}
        {disease === 'Heart Disease' && <HeartDiseaseForm onPredict={handlePredict} />}
        {disease === 'Parkinsons Disease' && <ParkinsonsDiseaseForm onPredict={handlePredict} />}

        {/* Display prediction result */}
        {prediction && (
          <Alert severity="success" style={{ marginTop: '1rem' }}>
            Prediction: {prediction}
          </Alert>
        )}
        {/* Display error message */}
        {error && (
          <Alert severity="error" style={{ marginTop: '1rem' }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Additional;



