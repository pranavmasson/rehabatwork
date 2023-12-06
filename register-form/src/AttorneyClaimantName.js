import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AttorneyClaimantName = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);

// Fetch data from /attorney_claimant
useEffect(() => {
  fetch('http://127.0.0.1:5000/attorney_claimant')
    .then((response) => response.json())
    .then((data) => setOptions(data))
    .catch((error) => console.error('Error:', error));
}, []);


return (
  <FormControl fullWidth>
    <InputLabel>Name</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      label="Attorney Claimant Name"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
};

export default AttorneyClaimantName;
