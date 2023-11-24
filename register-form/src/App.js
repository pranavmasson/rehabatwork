import React from 'react';
import PatientForm from './PatientForm';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <Router> {/* BrowserRouter wraps all your route definitions */}
      <Routes> {/* Routes is the new switch component in v6 */}
        <Route path="/" element={<HomePage />} /> {/* Define the route for HomePage */}
        <Route path="/patient-form" element={<PatientForm />} /> {/* Define the route for PatientForm */}
        {/* Add additional Routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
