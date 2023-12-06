import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png';
import { Typography, Button } from '@mui/material'; // Import Button along with Typography

const SubmissionConfirmation = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Adjust this route to match your homepage route
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Patient Submitted
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo} alt="company logo" style={{ width: '100px', height: '100px' }} />
      </div>
      {/* Material UI Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoHome}
        style={{ display: 'block', margin: '20px auto' }} // Center the button and add some margin
      >
        Go to Homepage
      </Button>
    </div>
  );
};

export default SubmissionConfirmation;
