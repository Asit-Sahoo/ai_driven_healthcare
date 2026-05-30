import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '1rem 0', backgroundColor: '#f1f1f1' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © 2025 AI-Driven Healthcare Center. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
