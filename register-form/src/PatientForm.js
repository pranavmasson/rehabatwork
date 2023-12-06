import React, { useState } from 'react';
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






const PatientForm = () => {
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
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [practitionerName, setPractitionerName] = useState('');
  const [caseManagerName, setCaseManagerName] = useState('');
  const [atfcName, setatfcName] = useState('');
  const [billedPartyName, setBilledPartyName] = useState('');
  const [employerName, setEmployerName] = useState('');

  const handlePractitionerChange = (event) => {
    setFormData({ ...formData, practitionerName: event.target.value });
  };

  const handlecaseManagerChange = (event) => {
    setFormData({ ...formData, caseManagerName: event.target.value });
  };

  const handleatfcChange = (event) => {
    setFormData({ ...formData, atfcName: event.target.value });
  };

  const handleBilledPartyChange = (event) => {
    setFormData({ ...formData, billedPartyName: event.target.value });
  };

  const handleEmployerNameChange = (event) => {
    setFormData({ ...formData, employerName: event.target.value });
  };





  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  
    try {
      const response = await fetch('http://localhost:5000/submit_patient_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully');
        // Handle successful submission, like clearing the form or showing a success message
      } else {
        console.error('Form submission failed:', response.statusText);
        // Handle response errors here
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors here
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient Last Name"
                    name="patientLastName"
                    value={formData.patientLastName}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="SSN"
                    name="patientSSN"
                    value={formData.patientSSN}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Patient Email Address"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Patient Address"
                    name="patientAddress"
                    value={formData.patientAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="patientZipCode"
                    value={formData.patientZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="City"
                    name="patientCity"
                    value={formData.patientCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Patient State"
                    name="patientState"
                    value={formData.patientState}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Therapist Initials"
                    name="therapistInitials"
                    value={formData.therapistInitials}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  >
                    <MenuItem value="male">Yes</MenuItem>
                    <MenuItem value="female">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Job Description?"
                    name="jobDescriptionSend"
                    select
                    value={formData.jobDescriptionSend}
                    onChange={handleChange}
                    margin="normal"
                  >
                    <MenuItem value="male">Yes</MenuItem>
                    <MenuItem value="female">No</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Other:"
                    name="otherDataSend"
                    value={formData.otherDataSend}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    value={formData.vocationalPlacement}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Practice"
                    name="practitionerPractice"
                    value={formData.practitionerPractice}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="practitionerAddress"
                    value={formData.practitionerAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="practitionerZipCode"
                    value={formData.practitionerZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="practitionerCity"
                    value={formData.practitionerCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="practitionerCity"
                    value={formData.practitionerCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="practitionerPhone"
                    value={formData.practitionerPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="practitionerEmail"
                    value={formData.practitionerEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="practitionerFax"
                    value={formData.practitionerFax}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="Preferred Contact"
                    select
                    value={formData.practitionerContactStyle}
                    onChange={handleChange}
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
                    name="Preferred Report"
                    select
                    value={formData.practitionerReportStyle}
                    onChange={handleChange}
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
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="caseManagerPractice"
                    value={formData.caseManagerPractice}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="caseManagerAddress"
                    value={formData.caseManagerAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="caseManagerZipCode"
                    value={formData.caseManagerZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="caseManagerCity"
                    value={formData.caseManagerCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="caseManagerCity"
                    value={formData.caseManagerCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="caseManagerPhone"
                    value={formData.caseManagerPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="caseManagerEmail"
                    value={formData.caseManagerEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="caseManagerFax"
                    value={formData.caseManagerFax}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="Preferred Contact"
                    select
                    value={formData.CaseManagerContactStyle}
                    onChange={handleChange}
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
                    name="Preferred Report"
                    select
                    value={formData.CaseManagerReportStyle}
                    onChange={handleChange}
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
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Firm"
                    name="atfcFirm"
                    value={formData.atfcFirm}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Paralegal"
                    name="atfcParalegal"
                    value={formData.atfcParalegal}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="atfcAddress"
                    value={formData.atfcAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="atfcZipCode"
                    value={formData.atfcZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="atfcCity"
                    value={formData.atfcCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="atfcState"
                    value={formData.atfcState}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="atfcPhone"
                    value={formData.atfcPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="atfcEmail"
                    value={formData.atfcEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="atfcFax"
                    value={formData.atfcFax}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="Preferred Contact"
                    select
                    value={formData.atfcContactStyle}
                    onChange={handleChange}
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
                    name="Preferred Report"
                    select
                    value={formData.atfcReportStyle}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Party Name"
                    name="additionalPartyName"
                    value={formData.additionalPartyName}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="additionalPartyCompany"
                    value={formData.additionalPartyCompany}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="additionalPartyAddress"
                    value={formData.additionalPartyAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="additionalPartyZipCode"
                    value={formData.additionalZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="additionalPartyCity"
                    value={formData.additionalPartyCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="additionalPartyState"
                    value={formData.additionalPartyState}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="additionalPartyPhone"
                    value={formData.additionalPartyPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="additionalPartyEmail"
                    value={formData.additionalPartyEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="additionalPartyFax"
                    value={formData.additionalPartyFax}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="Preferred Contact"
                    select
                    value={formData.additionalPartyContactStyle}
                    onChange={handleChange}
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
                    name="Preferred Report"
                    select
                    value={formData.additionalPartyReportStyle}
                    onChange={handleChange}
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
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Jurisdiction"
                    name="jurisdiction"
                    select
                    value={formData.billedPartyJurisdiction}
                    onChange={handleChange}
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
                    name="BilledPartyCompany"
                    value={formData.billedPartyCompany}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="BilledPartyAddress"
                    value={formData.billedPartyAddress}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="BilledPartyZipCode"
                    value={formData.billedZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    name="BilledPartyCity"
                    value={formData.billedPartyCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="BilledPartyState"
                    value={formData.billedPartyState}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="BilledPartyPhone"
                    value={formData.billedPartyPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="BilledPartyEmail"
                    value={formData.billedPartyEmail}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Fax"
                    name="BilledPartyFax"
                    value={formData.billedPartyFax}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Preferred Contact"
                    name="Preferred Contact"
                    select
                    value={formData.billedPartyContactStyle}
                    onChange={handleChange}
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
                    name="Preferred Report"
                    select
                    value={formData.billedPartyReportStyle}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Secondary Insurance/Claim/ID Identifier"
                    name="secondaryInsuranceIdentifier"
                    value={formData.secondaryInsuranceIdentifier}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Authorized Visits"
                    name="authorizedVisits"
                    value={formData.authorizedVisits}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Authorized Exp"
                    name="authorizedExp"
                    value={formData.authorizedExp}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={5}>
                  <TextField
                    fullWidth
                    label="Case Number"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                        setFormData({ ...formData, dob: date })
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="policyHolderZipCode"
                    value={formData.policyHolderZipCode}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="City"
                    name="policyHolderCity"
                    value={formData.policyHolderCity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="policyHolderState"
                    value={formData.policyHolderState}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="patientPosition"
                    value={formData.patientPosition}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact"
                    name="patientEmployerContact"
                    value={formData.patientEmployerContact}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="patientEmployerPhone"
                    value={formData.patientEmployerPhone}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
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
                      onChange={(date) =>
                        setFormData({ ...formData, dateOfRevision: date })
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
              <Typography variant="h6">Appointment Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="@"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
