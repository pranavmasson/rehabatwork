import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropdownMenu = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);

// Fetch data from /practitioners
useEffect(() => {
  fetch('http://127.0.0.1:5000/practitioners')
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

export default DropdownMenu;
