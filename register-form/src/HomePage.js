// HomePage.jsx
import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import logo from './assets/logo2.png';

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate

  // Handler for when the 'New Patient' button is clicked
  const handleNewPatientClick = () => {
    navigate('/patient-form'); // Navigate to the PatientForm route
  };

  // Handler for when the 'Search' button is clicked
  const handleSearch = (event) => {
    event.preventDefault();
    // Add your search logic here
    console.log('Search clicked');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        RehabAtWork Patient Portal
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="company logo" style={{ width: '100px', height: '100px' }} />
                {/* Rest of your component */}
        </div>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <Button type="submit">
                Search
              </Button>
            ),
          }}
        />
      </form>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewPatientClick}
        >
          New Patient
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
