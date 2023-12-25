// HomePage.jsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Card, CardContent, Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('name'); // 'name' or 'dob'
  const [patients, setPatients] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    let url = `http://localhost:5000/search?mode=${searchMode}&term=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleNewPatientClick = () => {
    navigate('/patient-form');
  };

  const toggleSearchMode = () => {
    setSearchMode(searchMode === 'name' ? 'dob' : 'name');
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
        <FormControlLabel
          control={<Switch checked={searchMode === 'dob'} onChange={toggleSearchMode} />}
          label={searchMode === 'name' ? 'Search by Name' : 'Search by Date of Birth'}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder={searchMode === 'name' ? 'Search by First and Last Name' : 'Search by Date of Birth (YYYY-MM-DD)'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleNewPatientClick}>
          New Patient
        </Button>
      </Box>

      {/* Display the fetched patient data */}
      {patients.map((patient, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{patient.patientFirstName} {patient.patientLastName}</Typography>
            <Typography variant="body1">DOB: {patient.dob}</Typography>
            <Typography variant="body1">Gender: {patient.gender}</Typography>
            <Typography variant="body1">DOI: {patient.doi}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default HomePage;
