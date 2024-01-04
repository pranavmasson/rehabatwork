import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PractitionerName from './PractitionerName';
import CaseManagerName from './CaseManagerName';
import AttorneyClaimantName from './AttorneyClaimantName';
import BilledPartyName from './BilledPartyName';
import EmployerDropdown from './EmployerDropdown';
import Services from './Services';
import DeadReferral from './DeadReferral';
import logo from './assets/logo2.png';
import SubmissionConfirmation from './SubmissionConfirmation'; // Adjust the path as necessary
import DropdownMenu from './PractitionerName'; // Adjust the path as necessary
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';








const PatientForm = () => {
  const { patientSSN } = useParams();
  const [formData, setFormData] = useState({
    patientFirstName: '',
    patientLastName: '',
    patientSSN: '',
    gender: '',
    dob: null,
    doi: null,
    field2: '',
    patientPhoneNumber: '',
    patientEmail: '',
    patientAddress: '',
    patientZipCode: '',
    patientState: '',
    patientCity: '',
    referralType: '',
    diagnosis: '',
    referredBy: '',
    icd10: '',
    therapistInitials: '',
    medicalRecordsSend: '',
    jobDescriptionSend: '',
    otherDataSend: '',
    returnToWork: '',
    vocationalPlacement: '',
    whwcOptional: '',
    otherReferralGoals: '',
    practitionerName: '',
    practitionerPractice: '',
    practitionerAddress: '',
    practitionerZipCode: '',
    practitionerCity: '',
    practitionerState: '',
    practitionerPhone: '',
    practitionerEmail: '',
    practitionerFax: '',
    practitionerContactStyle: '',
    practitionerReportStyle: '',
    caseManagerName: '',
    caseManagerPractice: '',
    caseManagerAddress: '',
    caseManagerZipCode: '',
    caseManagerCity: '',
    caseManagerState: '',
    caseManagerPhone: '',
    caseManagerEmail: '',
    caseManagerFax: '',
    caseManagerContactStyle: '',
    caseManagerReportStyle: '',
    atfcName: '',
    atfcFirm: '',
    atfcParalegal: '',
    atfcAddress: '',
    atfcZipCode: '',
    atfcCity: '',
    atfcState: '',
    atfcPhone: '',
    atfcEmail: '',
    atfcFax: '',
    atfcContactStyle: '',
    atfcReportStyle: '',
    additionalPartyType: '',
    additionalPartyName: '',
    additionalPartyCompany: '',
    additionalPartyAddress: '',
    additionalPartyZipCode: '',
    additionalPartyCity: '',
    additionalPartyState: '',
    additionalPartyPhone: '',
    additionalPartyEmail: '',
    additionalPartyFax: '',
    additionalPartyContactStyle: '',
    additionalPartyReportStyle: '',
    billedPartyName: '',
    billedPartyJurisdiction: '',
    billedPartyCompany: '',
    billedPartyAddress: '',
    billedPartyZipCode: '',
    billedPartyCity: '',
    billedPartyState: '',
    billedPartyPhone: '',
    billedPartyEmail: '',
    billedPartyFax: '',
    billedPartyContactStyle: '',
    billedPartyReportStyle: '',
    insuranceIdentifier: '',
    secondaryInsuranceIdentifier: '',
    authorizedVisits: '',
    authorizedExp: '',
    caseNumber: '',
    reasonForVisit: '',
    policyHolderName: '',
    policyHolderRelationship: '',
    phdob: null,
    policyHolderAddress: '',
    policyHolderZipCode: '',
    policyHolderCity: '',
    policyHolderState: '',
    benefitsExplained: '',
    patientPosition: '',
    patientEmployerContact: '',
    patientEmployerPhone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    dateOfReferral: null,
    dateOfRevision: null,
    appointmentDate: null,
    appointmentTime: null,
    referralNotes: '',
    employerName: '',
    deadReferralReason: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [practitionerName, setPractitionerName] = useState('');
  const [caseManagerName, setCaseManagerName] = useState('');
  const [atfcName, setatfcName] = useState('');
  const [billedPartyName, setBilledPartyName] = useState('');
  const [employerName, setEmployerName] = useState('');
  
  // useEffect(() => {
  //   setFormData({ ...formData, dateOfRevision: dayjs() });
  // }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
        if (patientSSN) {
            try {
                const response = await fetch(`http://localhost:5000/patient/${patientSSN}`);
                const data = await response.json();
                setFormData({ ...data, dateOfRevision: dayjs(data.dateOfRevision) });
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        } else {
            // Only set the dateOfRevision when adding a new patient (not editing)
            setFormData({ ...formData, dateOfRevision: dayjs() });
        }
    };

    fetchPatientData();
}, [patientSSN]);


  // const handlePractitionerChange = (event) => {
  //   setFormData({ ...formData, practitionerName: event.target.value });
  // };

  const handlePractitionerChange = (name) => {
    setFormData({ ...formData, practitionerName: name });
  };
  

  const handlecaseManagerChange = (name) => {
    setFormData({ ...formData, caseManagerName: name });
  };  
  

  const handleatfcChange = (selectedName) => {
    setFormData({ ...formData, atfcName: selectedName });
  };
  

  const handleBilledPartyChange = (name) => {
    setFormData({ ...formData, billedPartyName: name });
  };
  

  const handleEmployerNameChange = (name) => {
    setFormData({ ...formData, employerName: name });
  };

  const updatePractitionerDetails = (details) => {
    setFormData({
      ...formData,
      practitionerName: details.name || '',
      practitionerPractice: details.practice || '',
      practitionerAddress: details.address || '',
      practitionerZipCode: details.zipCode || '',
      practitionerCity: details.city || '',
      practitionerState: details.state || '',
      practitionerPhone: details.phone || '',
      practitionerEmail: details.email || '',
      practitionerFax: details.fax || '',
    });
  };

  const updateCaseManagerDetails = (details) => {
    setFormData({
      ...formData,
      caseManagerName: details.name || '',
      caseManagerPractice: details.company || '',
      caseManagerAddress: details.street || '',
      caseManagerZipCode: details.zipCode || '',
      caseManagerCity: details.city || '',
      caseManagerState: details.state || '',
      caseManagerPhone: details.phone || '',
      caseManagerEmail: details.email || '',
      caseManagerFax: details.fax || '',
    });
  };

  const updateAttorneyClaimantDetails = (details) => {
    setFormData({
      ...formData,
      atfcName: details.name || '',
      atfcFirm: details.firm || '',
      atfcAddress: details.street || '',
      atfcZipCode: details.zipCode || '',
      atfcCity: details.city || '',
      atfcState: details.state || '',
      atfcPhone: details.phone || '',
      atfcEmail: details.email || '',
      atfcFax: details.fax || '',
    });
  };

  const updateBilledPartyDetails = (details) => {
    setFormData({
      ...formData,
      billedPartyName: details.name || '',
      billedPartyAddress: details.address || '',
      billedPartyCity: details.city || '',
      billedPartyState: details.state || '',
      billedPartyZipCode: details.zipCode || '',
      billedPartyPhone: details.phone || '',
      billedPartyEmail: details.email || '',
      billedPartyFax: details.fax || '',
    });
  };

  const updateEmployerDetails = (details) => {
    setFormData({
      ...formData,
      employerName: details.name || '',
      patientEmployerPhone: details.phone || '',    });
  };
  





  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsSubmitted(true);
  
  //   try {
  //     const response = await fetch('http://localhost:5000/submit_patient_form', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     if (response.ok) {
  //       console.log('Form submitted successfully');
  //       // Handle successful submission, like clearing the form or showing a success message
  //     } else {
  //       console.error('Form submission failed:', response.statusText);
  //       // Handle response errors here
  //     }
  //   } catch (error) {
  //     console.error('Network error:', error);
  //     // Handle network errors here
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    // Determine the URL and HTTP method based on whether you are editing or creating a new patient
    const url = patientSSN ? `http://localhost:5000/update_patient/${patientSSN}` : 'http://localhost:5000/submit_patient_form';
    const method = patientSSN ? 'PUT' : 'POST'; // Use PUT for update, POST for create

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Form submitted successfully');
            // Handle successful submission
            // Redirect or display a success message
        } else {
            console.error('Form submission failed:', response.statusText);
            // Handle response errors here
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors here
    }
};


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
}
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handlePrint() {
    fetch('http://localhost:5000/print_pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    })
    .catch(error => {
        console.error('Error fetching from Flask server:', error);
        // You can also implement additional UI feedback for the error here
    });
}



 /*  const fontStyle = {
    fontFamily: 'Helvetica, sans-serif'  // set the font to Helvetica with a generic sans-serif fallback
  }; */

  if (isSubmitted) {
    return <SubmissionConfirmation />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Registration Packet
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePrint}>
                Print
      </Button>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="company logo" style={{ width: '100px', height: '100px' }} />
                {/* Rest of your component */}
            </div>
              <div className="form-box">
              <Typography variant="h6">Patient Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient First Name"
                    name="patientFirstName"
                    value={formData.patientFirstName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient Last Name"
                    name="patientLastName"
                    value={formData.patientLastName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="SSN"
                    name="patientSSN"
                    value={formData.patientSSN}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    select
                    value={formData.gender}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      name="dob"
                      value={formData.dob}
                      onChange={(date) =>
                        setFormData({ ...formData, dob: date })
                      }
                      margin="normal"
                    />
                  </LocalizationProvider>
                </Grid>
                {/* Add more fields here */}
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Injury"
                      name="doi"
                      value={formData.doi}
                      onChange={(date) =>
                        setFormData({ ...formData, doi: date })
                      }
                      margin="normal"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient Phone Number"
                    name="patientPhoneNumber"
                    value={formData.patientPhoneNumber}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient Email Address"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Patient Address"
                    name="patientAddress"
                    value={formData.patientAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="patientZipCode"
                    value={formData.patientZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="City"
                    name="patientCity"
                    value={formData.patientCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Patient State"
                    name="patientState"
                    value={formData.patientState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Referral Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Type of Referral"
                    name="referralType"
                    select
                    value={formData.referralType}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="WC">WC</MenuItem>
                    <MenuItem value="DORS">DORS</MenuItem>
                    <MenuItem value="DARS">DARS</MenuItem>
                    <MenuItem value="EMP">EMP</MenuItem>
                    <MenuItem value="SELF PAY">SELF PAY</MenuItem>
                    <MenuItem value="COMM">COMM</MenuItem>
                    <MenuItem value="ATTY-DEFN">ATTY-DEFN</MenuItem>
                    <MenuItem value="ATTY-CLAIM">ATTY-CLAIM</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Referred By"
                    name="referredBy"
                    select
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Adjuster">Adjuster</MenuItem>
                    <MenuItem value="Attorney-Claimant">Attorney-Claimant</MenuItem>
                    <MenuItem value="IM Attorney-Defense">IM Attorney-Defense</MenuItem>
                    <MenuItem value="Case Manager-Medical">Case Manager-Medical</MenuItem>
                    <MenuItem value="Employer">Employer</MenuItem>
                    <MenuItem value="Physician">Physician</MenuItem>
                    <MenuItem value="Self">Self</MenuItem>
                    <MenuItem value="ТРА">ТРА</MenuItem>
                    <MenuItem value="Vocational Counselor">Vocational Counselor</MenuItem>
                    <MenuItem value="RAW Transfer">RAW Transfer</MenuItem>
                    <MenuItem value="RAW Conversion from PT/OT">AW Conversion from PT/OT</MenuItem>
                    <MenuItem value="Previous Patient">Previous Patient</MenuItem>
                    <MenuItem value="Other PT/OT Company">Other PT/OT Company</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="ICD-10"
                    name="icd10"
                    value={formData.icd10}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Therapist Initials"
                    name="therapistInitials"
                    value={formData.therapistInitials}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Medical Records?"
                    name="medicalRecordsSend"
                    select
                    value={formData.medicalRecordsSend}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Job Description?"
                    name="jobDescriptionSend"
                    select
                    value={formData.jobDescriptionSend}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Other:"
                    name="otherDataSend"
                    value={formData.otherDataSend}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <DeadReferral/>
                </Grid>
                {/* Add more fields here */}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Goals of Referral</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Return to Work"
                    name="returnToWork"
                    select
                    value={formData.returnToWork}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Vocational Placement"
                    name="vocationalPlacement"
                    select
                    value={formData.vocationalPlacement}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="WH/WC Optional"
                    name="whwcOptional"
                    select
                    value={formData.whwcOptional}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Other?"
                    name="otherReferralGoals"
                    value={formData.otherReferralGoals}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Practitioner Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <PractitionerName 
                  value={formData.practitionerName} 
                  onChange={handlePractitionerChange}
                  updatePractitionerDetails={updatePractitionerDetails}
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Practice"
                    name="practitionerPractice"
                    value={formData.practitionerPractice}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="practitionerAddress"
                    value={formData.practitionerAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="practitionerZipCode"
                    value={formData.practitionerZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="practitionerCity"
                    value={formData.practitionerCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="practitionerState"
                    value={formData.practitionerState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="practitionerPhone"
                    value={formData.practitionerPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="practitionerEmail"
                    value={formData.practitionerEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="practitionerFax"
                    value={formData.practitionerFax}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="practitionerContactStyle"
                    select
                    value={formData.practitionerContactStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Report"
                    name="practitionerReportStyle"
                    select
                    value={formData.practitionerReportStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Fax">Fax</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Case Manager Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CaseManagerName 
                  value={formData.caseManagerName} 
                  onChange={handlecaseManagerChange}
                  updateCaseManagerDetails={updateCaseManagerDetails}
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="caseManagerPractice"
                    value={formData.caseManagerPractice}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="caseManagerAddress"
                    value={formData.caseManagerAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="caseManagerZipCode"
                    value={formData.caseManagerZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="caseManagerCity"
                    value={formData.caseManagerCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="caseManagerState"
                    value={formData.caseManagerState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="caseManagerPhone"
                    value={formData.caseManagerPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="caseManagerEmail"
                    value={formData.caseManagerEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="caseManagerFax"
                    value={formData.caseManagerFax}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="caseManagerContactStyle"
                    select
                    value={formData.caseManagerContactStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Report"
                    name="caseManagerReportStyle"
                    select
                    value={formData.caseManagerReportStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Fax">Fax</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Attorney for the Claimant Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AttorneyClaimantName 
                  value={formData.atfcName} 
                  onChange={handleatfcChange}
                  updateAttorneyClaimantDetails={updateAttorneyClaimantDetails}
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Firm"
                    name="atfcFirm"
                    value={formData.atfcFirm}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Paralegal"
                    name="atfcParalegal"
                    value={formData.atfcParalegal}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="atfcAddress"
                    value={formData.atfcAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="atfcZipCode"
                    value={formData.atfcZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="atfcCity"
                    value={formData.atfcCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="atfcState"
                    value={formData.atfcState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="atfcPhone"
                    value={formData.atfcPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="atfcEmail"
                    value={formData.atfcEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="atfcFax"
                    value={formData.atfcFax}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="atfcContactStyle"
                    select
                    value={formData.atfcContactStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Report"
                    name="atfcReportStyle"
                    select
                    value={formData.atfcReportStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Fax">Fax</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Additional Party</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Party Type"
                    name="additionalPartyType"
                    value={formData.additionalPartyType}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Party Name"
                    name="additionalPartyName"
                    value={formData.additionalPartyName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="additionalPartyCompany"
                    value={formData.additionalPartyCompany}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="additionalPartyAddress"
                    value={formData.additionalPartyAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="additionalPartyZipCode"
                    value={formData.additionalZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="additionalPartyCity"
                    value={formData.additionalPartyCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="additionalPartyState"
                    value={formData.additionalPartyState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="additionalPartyPhone"
                    value={formData.additionalPartyPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="additionalPartyEmail"
                    value={formData.additionalPartyEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="additionalPartyFax"
                    value={formData.additionalPartyFax}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="additionalPartyContactStyle"
                    select
                    value={formData.additionalPartyContactStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Report"
                    name="additionalPartyReportStyle"
                    select
                    value={formData.additionalPartyReportStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Fax">Fax</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Billed Party</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <BilledPartyName 
                  value={formData.billedPartyName} 
                  onChange={handleBilledPartyChange}
                  updateBilledPartyDetails={updateBilledPartyDetails}
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Jurisdiction"
                    name="billedPartyJurisdiction"
                    select
                    value={formData.billedPartyJurisdiction}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="DC">DC</MenuItem>
                    <MenuItem value="MD">MD</MenuItem>
                    <MenuItem value="VA">VA</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="billedPartyCompany"
                    value={formData.billedPartyCompany}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="billedPartyAddress"
                    value={formData.billedPartyAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="billedZipCode"
                    value={formData.billedZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="billedPartyCity"
                    value={formData.billedPartyCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="billedPartyState"
                    value={formData.billedPartyState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="billedPartyPhone"
                    value={formData.billedPartyPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="billedPartyEmail"
                    value={formData.billedPartyEmail}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="billedPartyFax"
                    value={formData.billedPartyFax}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="billedPartyContactStyle"
                    select
                    value={formData.billedPartyContactStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Report"
                    name="billedPartyReportStyle"
                    select
                    value={formData.billedPartyReportStyle}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Fax">Fax</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Insurance Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Insurance/Claim/ID Identifier"
                    name="insuranceIdentifier"
                    value={formData.insuranceIdentifier}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Secondary Insurance/Claim/ID Identifier"
                    name="secondaryInsuranceIdentifier"
                    value={formData.secondaryInsuranceIdentifier}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Authorized Visits"
                    name="authorizedVisits"
                    value={formData.authorizedVisits}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Authorized Exp"
                    name="authorizedExp"
                    value={formData.authorizedExp}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={5}>
                  <TextField
                    fullWidth
                    label="Case Number"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    fullWidth
                    label="Reason for Visit"
                    name="reasonForVisit"
                    select
                    value={formData.reasonForVisit}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="FCE">FCE</MenuItem>
                    <MenuItem value="FCE/WH">FCE/WH</MenuItem>
                    <MenuItem value="FCE/IMP">FCE/IMP</MenuItem>
                    <MenuItem value="WHEE/WH">WHEE/WH</MenuItem>
                    <MenuItem value="WH">WH</MenuItem>
                    <MenuItem value="OT">OT</MenuItem>
                    <MenuItem value="PT">PT</MenuItem>
                    <MenuItem value="JA/ERGO">JA/ERGO</MenuItem>
                    <MenuItem value="POET">POET</MenuItem>
                    <MenuItem value="WSS-OTHER">WSS-OTHER</MenuItem>
                    <MenuItem value="OTHER-NA">OTHER-NA</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Policy Holder Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Policy Holder's Name Other Than Self"
                    name="policyHolderName"
                    value={formData.policyHolderName}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Relationship to Policy Holder"
                    name="policyHolderRelationship"
                    select
                    value={formData.policyHolderRelationship}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Spouse">Spouse</MenuItem>
                    <MenuItem value="Child">Child</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Self">Self</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker item xs={8}
                      label="Policy Holder's DOB"
                      name="phdob"
                      value={formData.phdob}
                      onChange={(date) =>
                        setFormData({ ...formData, phdob: date })
                      }
                      margin="normal"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Policy Holder Address"
                    name="policyHolderAddress"
                    value={formData.policyHolderAddress}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="policyHolderZipCode"
                    value={formData.policyHolderZipCode}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="City"
                    name="policyHolderCity"
                    value={formData.policyHolderCity}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="policyHolderState"
                    value={formData.policyHolderState}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Has a staff member explained your benefits to you"
                    name="benefitsExplained"
                    select
                    value={formData.benefitsExplained}
                    onChange={handleInputChange}
                    margin="normal"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Employment Information @ Time of Injury</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <EmployerDropdown 
                  value={formData.employerName} 
                  onChange={handleEmployerNameChange}
                  updateEmployerDetails={updateEmployerDetails}
                />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="patientPosition"
                    value={formData.patientPosition}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact"
                    name="patientEmployerContact"
                    value={formData.patientEmployerContact}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="patientEmployerPhone"
                    value={formData.patientEmployerPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="form-box">
              <Typography variant="h6">Emergency Contact Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-box">
              <Typography variant="h6">Date of Referral</Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker item xs={8}
                      label="Date of Referral"
                      name="dateOfReferral"
                      value={formData.dateOfReferral}
                      onChange={(date) =>
                        setFormData({ ...formData, dateOfReferral: date })
                      }
                      margin="normal"
                    />
                  </LocalizationProvider>
                </Grid>

              </Grid>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-box">
              <Typography variant="h6">Date of Revision</Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker item xs={8}
                      label="Date of Revision"
                      name="dateOfRevision"
                      value={formData.dateOfRevision}
                      onChange={(newDate) => {
                        setFormData({ ...formData, dateOfRevision: dayjs(newDate) });
                      }}
                      margin="normal"
                    />
                  </LocalizationProvider>
                </Grid>

              </Grid>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-box">
              <Typography variant="h6">Appointment Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="@"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Services />
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-box">
              <Typography variant="h6">Notes for Referral</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="@"
                    name="referralNotes"
                    value={formData.referralNotes}
                    onChange={handleInputChange}
                    margin="normal"
                    InputProps={{
                      style: {
                        width: '420px', // Adjust the height value as needed
                        height: '125px', // Adjust the height value as needed
                      },
                    }}
                  />
                </Grid>

              </Grid>
            </div>
          </Grid>

          {/* Add more boxes with fields here */}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default PatientForm;
