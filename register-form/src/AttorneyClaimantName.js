import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AttorneyClaimantName = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch data from the database or an API endpoint.
    // Replace the fetch URL with your actual backend endpoint.
    fetch('http://127.0.0.1:5000/attorney_claimant')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of objects with 'value' and 'label' properties.
        setOptions(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Name</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label="Name"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AttorneyClaimantName;
