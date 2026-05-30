import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useUser } from '../pages/UserContext';
import AmbulanceIcon from '../assets/ambulance.svg'; // Adjust path if needed
import EmergencyFormModal from './EmergencyFormModal'; // Make sure this path is correct

const Header = () => {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmergencyClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 2 }}>
              AI-Driven Healthcare Center
            </Typography>

            {/* Emergency Alert Button */}
            <Button
              onClick={handleEmergencyClick}
              variant="contained"
              sx={{
                bgcolor: 'red',
                color: 'white',
                animation: 'pulse 1.5s infinite',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                '&:hover': {
                  bgcolor: 'darkred',
                },
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <img src={AmbulanceIcon} alt="Ambulance" style={{ width: '24px', height: '24px' }} />
              Emergency Alert
            </Button>
          </Box>

          {/* Navigation */}
          <Box>
            <Button color="inherit" component={Link} to="/">Home</Button>
            {isLoggedIn && <Button color="inherit" component={Link} to="/additional">Additional</Button>}
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/services">Services</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>

            {isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/ContactDoctor">Contact Doctor</Button>
                <Button color="inherit" component={Link} to="/records">Records</Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Emergency Form Modal */}
      <EmergencyFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;








