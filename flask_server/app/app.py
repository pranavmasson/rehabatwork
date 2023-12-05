from flask import Flask, jsonify
import pyodbc
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
server = r'RAWSVR-DB\ADA'  # Use a raw string to handle the backslash
database = 'PatientForm'
username = 'sa'
password = '$Monday01'
driver = '{ODBC Driver 18 for SQL Server}'

# Establish a database connection and return cursor
def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER=' + driver + ';SERVER=' + server +
        ';DATABASE=' + database + ';UID=' + username +
        ';PWD=' + password + ';TrustServerCertificate=Yes')
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM your_table')  # Replace with your actual table name
    data = cursor.fetchall()
    result = [{'column1': row[0], 'column2': row[1]} for row in data]  # Adjust as per your table structure
    cursor.close()
    conn.close()
    return jsonify(result)

@app.route('/dead_referral_reasons')
def get_dead_referral_reasons():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT label FROM dead_referral_reasons')  # Replace with actual table name
    referrals = cursor.fetchall()
    options = [row[0] for row in referrals]  # Accessing by index
    options.append('Other')
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/attorney_claimant')
def get_attorney_claimant():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT Full_Name FROM attorneys')  # Replace with actual table name
    attorneys = cursor.fetchall()
    options = [row[0] for row in attorneys]  # Accessing by index
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/billed_party')
def get_billed_party():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT Name FROM billed_party')  # Replace with actual table name
    billed = cursor.fetchall()
    options = [row[0] for row in billed]  # Accessing by index
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/case-managers')
def get_managers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT Full_Name FROM case_managers')  # Replace with actual table name
    case_managers = cursor.fetchall()
    options = [row[0] for row in case_managers]  # Accessing by index
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/employers')
def get_employers():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Name FROM employers')  # Ensure the table name is correctly referenced
    employers = cursor.fetchall()
    options = [row[0] for row in employers]  # Accessing by index
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/practitioners')
def get_practitioners():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT Full_Name FROM practitioners')  # Replace with actual table name
    practitioners = cursor.fetchall()
    options = [row[0] for row in practitioners]  # Accessing by index
    cursor.close()
    conn.close()
    return jsonify(options)

@app.route('/submit_patient_form', methods=['POST'])
def submit_patient_form():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    # SQL query to insert data into the table
    insert_query = """
    INSERT INTO PatientForms (
        PatientFormId, patientFirstName, patientLastName, patientSSN, gender, dob, doi, field2,
        patientPhoneNumber, patientEmail, patientAddress, patientZipCode, patientState, patientCity,
        referralType, diagnosis, referredBy, icd10, therapistInitials, medicalRecordsSend,
        jobDescriptionSend, otherDataSend, returnToWork, vocationalPlacement, whwcOptional,
        otherReferralGoals, practitionerName, practitionerPractice, practitionerAddress,
        practitionerZipCode, practitionerCity, practitionerState, practitionerPhone,
        practitionerEmail, practitionerFax, practitionerContactStyle, practitionerReportStyle,
        caseManagerName, caseManagerPractice, caseManagerAddress, caseManagerZipCode,
        caseManagerCity, caseManagerState, caseManagerPhone, caseManagerEmail, caseManagerFax,
        caseManagerContactStyle, caseManagerReportStyle, atfcName, atfcFirm, atfcParalegal,
        atfcAddress, atfcZipCode, atfcCity, atfcState, atfcPhone, atfcEmail, atfcFax,
        atfcContactStyle, atfcReportStyle, additionalPartyType, additionalPartyName,
        additionalPartyCompany, additionalPartyAddress, additionalPartyZipCode, additionalPartyCity,
        additionalPartyState, additionalPartyPhone, additionalPartyEmail, additionalPartyFax,
        additionalPartyContactStyle, additionalPartyReportStyle, billedPartyName,
        billedPartyJurisdiction, billedPartyCompany, billedPartyAddress, billedPartyZipCode,
        billedPartyCity, billedPartyState, billedPartyPhone, billedPartyEmail, billedPartyFax,
        billedPartyContactStyle, billedPartyReportStyle, insuranceIdentifier,
        secondaryInsuranceIdentifier, authorizedVisits, authorizedExp, caseNumber,
        reasonForVisit, policyHolderName, policyHolderRelationship, phdob, policyHolderAddress,
        policyHolderZipCode, policyHolderCity, policyHolderState, benefitsExplained, patientPosition,
        patientEmployerContact, patientEmployerPhone, emergencyContactName, emergencyContactPhone,
        emergencyContactRelationship, dateOfReferral, dateOfRevision, appointmentDate,
        appointmentTime, referralNotes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    cursor.execute(insert_query, (
        data['PatientFormId'], data['patientFirstName'], data['patientLastName'], data['patientSSN'],
        data['gender'], data['dob'], data['doi'], data['field2'], data['patientPhoneNumber'],
        data['patientEmail'], data['patientAddress'], data['patientZipCode'], data['patientState'],
        data['patientCity'], data['referralType'], data['diagnosis'], data['referredBy'],
        data['icd10'], data['therapistInitials'], data['medicalRecordsSend'],
        data['jobDescriptionSend'], data['otherDataSend'], data['returnToWork'],
        data['vocationalPlacement'], data['whwcOptional'], data['otherReferralGoals'],
        data['practitionerName'], data['practitionerPractice'], data['practitionerAddress'],
        data['practitionerZipCode'], data['practitionerCity'], data['practitionerState'],
        data['practitionerPhone'], data['practitionerEmail'], data['practitionerFax'],
        data['practitionerContactStyle'], data['practitionerReportStyle'], data['caseManagerName'],
        data['caseManagerPractice'], data['caseManagerAddress'], data['caseManagerZipCode'],
        data['caseManagerCity'], data['caseManagerState'], data['caseManagerPhone'],
        data['caseManagerEmail'], data['caseManagerFax'], data['caseManagerContactStyle'],
        data['caseManagerReportStyle'], data['atfcName'], data['atfcFirm'], data['atfcParalegal'],
        data['atfcAddress'], data['atfcZipCode'], data['atfcCity'], data['atfcState'],
        data['atfcPhone'], data['atfcEmail'], data['atfcFax'], data['atfcContactStyle'],
        data['atfcReportStyle'], data['additionalPartyType'], data['additionalPartyName'],
        data['additionalPartyCompany'], data['additionalPartyAddress'], data['additionalPartyZipCode'],
        data['additionalPartyCity'], data['additionalPartyState'], data['additionalPartyPhone'],
        data['additionalPartyEmail'], data['additionalPartyFax'], data['additionalPartyContactStyle'],
        data['additionalPartyReportStyle'], data['billedPartyName'], data['billedPartyJurisdiction'],
        data['billedPartyCompany'], data['billedPartyAddress'], data['billedPartyZipCode'],
        data['billedPartyCity'], data['billedPartyState'], data['billedPartyPhone'],
        data['billedPartyEmail'], data['billedPartyFax'], data['billedPartyContactStyle'],
        data['billedPartyReportStyle'], data['insuranceIdentifier'], data['secondaryInsuranceIdentifier'],
        data['authorizedVisits'], data['authorizedExp'], data['caseNumber'], data['reasonForVisit'],
        data['policyHolderName'], data['policyHolderRelationship'], data['phdob'], data['policyHolderAddress'],
        data['policyHolderZipCode'], data['policyHolderCity'], data['policyHolderState'],
        data['benefitsExplained'], data['patientPosition'], data['patientEmployerContact'],
        data['patientEmployerPhone'], data['emergencyContactName'], data['emergencyContactPhone'],
        data['emergencyContactRelationship'], data['dateOfReferral'], data['dateOfRevision'],
        data['appointmentDate'], data['appointmentTime'], data['referralNotes']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Form submitted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
