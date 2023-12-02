import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EmployerDropdown = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);

// Fetch data from /employers
useEffect(() => {
  fetch('http://127.0.0.1:5000/employers')
    .then((response) => response.json())
    .then((data) => setOptions(data))
    .catch((error) => console.error('Error:', error));
}, []);


  return (
    <FormControl fullWidth>
      <InputLabel>Employer</InputLabel>
      <Select
        name="Employer"
        value={value}
        onChange={onChange}
        label="Employer"
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

export default EmployerDropdown;
