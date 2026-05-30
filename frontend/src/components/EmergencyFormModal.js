// EmergencyFormModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import API from '../api';

const EmergencyFormModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (err) => {
        alert('Failed to fetch location');
      }
    );
  };

  const handleSubmit = async () => {
    handleGetLocation();

    if (!email || !mobile) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // const res = await fetch('http://localhost:5000/users/emergency-alert',
      // const res = await API.post('/users/emergency-alert', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email,
      //     mobile,
      //     location
      //   })
      // });
      const res = await API.post('/users/emergency-alert', {
        email,
        mobile,
        location
      });
      console.log(email)
      const data = await res.json();
      alert(data.message || 'Emergency alert sent!');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to send emergency alert');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'white',
          width: 400,
          mx: 'auto',
          mt: '10%',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h6">Emergency Contact Form</Typography>
        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: 'red' }}>
          Submit Emergency Alert
        </Button>
      </Box>
    </Modal>
  );
};

export default EmergencyFormModal;
