// HomePage.jsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);

  const handleNewPatientClick = () => {
    navigate('/patient-form');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const [firstName, lastName] = searchTerm.split(' ');
      const response = await fetch(`http://localhost:5000/search?firstName=${firstName}&lastName=${lastName}`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        RehabAtWork Patient Portal
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logo} alt="company logo" style={{ width: '100px', height: '100px' }} />
      </div>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by First and Last Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewPatientClick}
        >
          New Patient
        </Button>
      </Box>
      {patients.length > 0 ? (
        patients.map((patient, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5">{patient.patientFirstName} {patient.patientLastName}</Typography>
              <Typography variant="body1">Phone: {patient.patientPhoneNumber}</Typography>
              <Typography variant="body2">Email: {patient.patientEmail}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">No patients found</Typography>
      )}
    </Container>
  );
};

export default HomePage;