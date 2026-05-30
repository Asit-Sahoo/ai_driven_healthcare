import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import API from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:5000/api/contact", formData);
      const response = await API.post("/api/contact", formData);
      setFeedback(response.data.message);
      setFormData({ name: '', email: '', message: '' }); // Reset form fields
    } catch (error) {
      setFeedback("Error sending message. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '6rem' }}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <Box mt={2} p={2} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            style={{ marginBottom: '1rem' }}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Your Email"
            name="email"
            variant="outlined"
            fullWidth
            required
            style={{ marginBottom: '1rem' }}
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">Send Message</Button>
        </form>
        {feedback && <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>{feedback}</Typography>}
      </Box>
    </Container>
  );
};

export default Contact;
