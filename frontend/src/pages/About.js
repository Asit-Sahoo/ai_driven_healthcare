import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container 
      maxWidth="md" 
      style={{ marginTop: '6rem' }} // Adjust margin top to push content below the fixed header
    >
      <Typography variant="h3" gutterBottom>About Us</Typography>
      <Typography variant="body1">
        AI Healthcare Center is committed to providing cutting-edge healthcare solutions through the integration of AI technology.
        Our goal is to revolutionize the healthcare industry by making advanced medical services accessible and efficient for everyone.
      </Typography>
    </Container>
  );
};

export default About;
