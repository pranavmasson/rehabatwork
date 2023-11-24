import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DeadReferral = ({ name, value, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/dead_referral_reasons')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is now just an array of strings (labels).
        setOptions(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Dead Referral Reason</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label="Dead Referral Reason"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((label) => (
          // Using the label as the value since only labels are provided.
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DeadReferral;
