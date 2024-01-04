from flask import Flask, request, jsonify, send_file
import pyodbc
from flask_cors import CORS
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
import io
import re
from datetime import datetime
from email.utils import parsedate_to_datetime

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
    cursor.execute('SELECT Full_Name, Company_Need_to_Add, EMail FROM case_managers')  # Replace with actual table name
    case_managers = cursor.fetchall()
    options = [{'Full_Name': row[0], 'Company_Need_to_Add': row[1], 'EMail': row[2]} for row in case_managers]
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
    cursor.execute('SELECT Full_Name, Practice, City FROM practitioners')
    practitioners = cursor.fetchall()
    options = [{'Full_Name': row[0], 'Practice': row[1], 'City': row[2]} for row in practitioners]
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
        patientFirstName, patientLastName, patientSSN, gender, dob, doi, field2,
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    print("here: " + data['practitionerName'])
    cursor.execute(insert_query, (
        data['patientFirstName'], data['patientLastName'], data['patientSSN'],
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

@app.route('/search', methods=['GET'])
def search_patients():
    mode = request.args.get('mode')
    term = request.args.get('term')
    print(f"Search mode: {mode}, term: {term}")

    conn = get_db_connection()
    cursor = conn.cursor()

    if mode == 'name':
        first_name, last_name = term.split(' ')
        query = """
            SELECT patientFirstName, patientLastName, dob, gender, doi, patientSSN
            FROM PatientForms
            WHERE patientFirstName LIKE ? AND patientLastName LIKE ?
        """
        cursor.execute(query, (first_name + '%', last_name + '%'))
    elif mode == 'dob':
        query = """
            SELECT patientFirstName, patientLastName, dob, gender, doi, patientSSN
            FROM PatientForms
            WHERE dob = ?
        """
        cursor.execute(query, (term,))

    results = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    print(f"Query results: {results}")
    return jsonify(results)

@app.route('/practitioner_details/<practitioner_name>')
def get_practitioner_details(practitioner_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Replace the SQL query with one appropriate for your database schema
    cursor.execute('SELECT Full_Name, Practice, Street_1, City, State, Zip_Code, Office, Fax, Email FROM practitioners WHERE Full_Name = ?', practitioner_name)
    data = cursor.fetchone()
    print(data[4])
    if data:
        details = {
            'name': data[0],
            'practice': data[1],
            'address': data[2],
            'city': data[3],
            'state': data[4],
            'zipCode': data[5],
            'phone': data[6],
            'fax': data[7],
            'email': data[8]
        }
    else:
        details = {}
    cursor.close()
    conn.close()
    return jsonify(details)

@app.route('/case_manager_details/<case_manager_name>')
def get_case_manager_details(case_manager_name):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Adjust the query based on your actual database schema
    cursor.execute('SELECT Full_Name, Company_Need_to_Add, Street_1, City, State, Zip_Code, Office, Fax, EMail FROM case_managers WHERE Full_Name = ?', case_manager_name)
    data = cursor.fetchone()
    if data:
        details = {
            'name': data[0],
            'company': data[1],
            'street': data[2],
            'city': data[3],
            'state': data[4],
            'zipCode': data[5],
            'office': data[6],
            'fax': data[7],
            'email': data[8]
        }
    else:
        details = {}
    cursor.close()
    conn.close()
    return jsonify(details)

@app.route('/attorney_claimant_details/<name>')
def get_attorney_claimant_details(name):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Adjust the query based on your actual database schema
    cursor.execute('SELECT Full_Name, Company_Need_to_Add, Street_1, City, State, Zip_Code, Office, Fax, EMail FROM attorneys WHERE Full_Name = ?', name)
    data = cursor.fetchone()
    if data:
        details = {
            'name': data[0],
            'firm': data[1],
            'street': data[2],
            'city': data[3],
            'state': data[4],
            'zipCode': data[5],
            'phone': data[6],
            'fax': data[7],
            'email': data[8]
        }
    else:
        details = {}
    cursor.close()
    conn.close()
    return jsonify(details)

from flask import jsonify, abort

@app.route('/billed_party_details/<name>')
def get_billed_party_details(name):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT Name, Street_1, City, State, Zip_Code, Office, Fax, EMail FROM billed_party WHERE Name = ?', [name])
        data = cursor.fetchone()
        if data:
            details = {
                'name': data[0],
                'address': data[1],
                'city': data[2],
                'state': data[3],
                'zipCode': data[4],
                'phone': data[5],
                'fax': data[6],
                'email': data[7]
            }
        else:
            details = {}
        cursor.close()
        conn.close()
        return jsonify(details)
    except Exception as e:
        print(e)
        abort(500)  # Send a 500 Internal Server Error response

@app.route('/employer_details/<employer_name>')
def get_employer_details(employer_name):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT Name, Office FROM employers WHERE Name = ?', [employer_name])
        data = cursor.fetchone()
        if data:
            details = {
                'name': data[0],
                'phone': data[1]
                # Include other fields here if they become available
            }
        else:
            details = {}
        cursor.close()
        conn.close()
        return jsonify(details)
    except Exception as e:
        print(e)
        abort(500)

@app.route('/print_pdf', methods=['POST'])
def print_pdf():
    data = request.json
    
    # Load your single-page scanned PDF
    reader = PdfReader("registerpdf.pdf")
    writer = PdfWriter()

    # Create a new PDF to overlay text
    packet = io.BytesIO()
    can = canvas.Canvas(packet)
    can.setFont("Helvetica", 8)

    # Overlay text for each field. Replace with your actual coordinates
    # Example: can.drawString(x_coordinate, y_coordinate, data.get("fieldName", ""))
    can.drawString(100, 619, data.get("patientFirstName", ""))  # Replace 100, 700 with actual coordinates
    can.drawString(200, 619, data.get("patientLastName", ""))
    can.drawString(100, 608, data.get("gender", ""))
    dob = data.get("dob", "")
    if dob:
        formatted_dob = dob[:10]  # Extracts the first 10 characters
        can.drawString(200, 608, formatted_dob)
    can.drawString(100, 597, data.get("patientPhoneNumber", ""))
    can.drawString(375, 597, data.get("patientEmail", ""))
    doi = data.get("doi", "")
    if doi:
        formatted_doi = doi[:10]  # Extracts the first 10 characters
        can.drawString(375, 607, formatted_doi)
    ssn = data.get("patientSSN", "")
    formatted_ssn = ssn[5:]  # Extracts the last 4 characters
    can.drawString(400, 619, formatted_ssn)
    can.drawString(100, 583, data.get("patientAddress", ""))
    can.drawString(375, 583, data.get("patientCity", ""))
    can.drawString(450, 583, data.get("patientState", ""))
    can.drawString(500, 583, data.get("patientZipCode", ""))

    can.drawString(100, 560, data.get("referralType", ""))
    can.drawString(395, 560, data.get("referredBy", ""))
    can.drawString(375, 549, data.get("diagnosis", ""))
    can.drawString(100, 548, data.get("icd10", ""))
    can.drawString(100, 537, data.get("therapistInitials", ""))
    can.drawString(100, 526, data.get("medicalRecordsSend", ""))
    can.drawString(100, 515, data.get("jobDescriptionSend", ""))
    otherData = data.get("otherDataSend", "")
    if otherData:
        can.drawString(214, 514, "X")
        can.drawString(275, 514, otherData)
    can.drawString(210, 503, data.get("returnToWork", ""))
    can.drawString(315, 503, data.get("vocationalPlacement", ""))
    can.drawString(450, 503, data.get("whwcOptional", ""))
    can.drawString(125, 491, data.get("otherReferralGoals", ""))

    can.drawString(100, 455, data.get("practitionerName", ""))
    can.drawString(375, 455, data.get("practitionerPractice", ""))
    can.drawString(100, 442, data.get("practitionerAddress", ""))
    can.drawString(375, 442, data.get("practitionerCity", ""))
    can.drawString(450, 442, data.get("practitionerState", ""))
    can.drawString(500, 442, str(data.get("practitionerZipCode", "")))
    can.drawString(100, 430, data.get("practitionerPhone", ""))
    can.drawString(375, 430, data.get("practitionerFax", ""))
    can.drawString(100, 418, data.get("practitionerEmail", ""))

    can.drawString(100, 404, data.get("caseManagerName", ""))
    can.drawString(375, 404, data.get("caseManagerPractice", ""))
    can.drawString(100, 391, data.get("caseManagerAddress", ""))
    can.drawString(375, 391, data.get("caseManagerCity", ""))
    can.drawString(450, 391, data.get("caseManagerState", ""))
    can.drawString(500, 391, data.get("caseManagerZipCode", ""))
    can.drawString(100, 379, data.get("caseManagerPhone", ""))
    can.drawString(375, 379, data.get("caseManagerFax", ""))
    can.drawString(100, 367, data.get("caseManagerEmail", ""))

    can.drawString(100, 353, data.get("atfcName", ""))
    can.drawString(375, 353, data.get("atfcFirm", ""))
    can.drawString(100, 340, data.get("atfcAddress", ""))
    can.drawString(375, 340, data.get("atfcCity", ""))
    can.drawString(450, 340, data.get("atfcState", ""))
    can.drawString(500, 340, str(data.get("atfcZipCode", "")))
    can.drawString(100, 328, data.get("atfcPhone", ""))
    can.drawString(375, 328, data.get("atfcFax", ""))
    can.drawString(100, 316, data.get("atfcEmail", ""))
    can.drawString(375, 316, data.get("atfcParalegal", ""))

    can.drawString(100, 291, data.get("additionalPartyType", ""))
    can.drawString(200, 291, data.get("additionalPartyName", ""))
    can.drawString(375, 291, data.get("additionalPartyCompany", ""))
    can.drawString(100, 280, data.get("additionalPartyAddress", ""))
    can.drawString(375, 280, data.get("additionalPartyCity", ""))
    can.drawString(450, 280, data.get("additionalPartyState", ""))
    can.drawString(500, 280, str(data.get("additionalPartyZipCode", "")))
    can.drawString(100, 268, data.get("additionalPartyPhone", ""))
    can.drawString(375, 268, data.get("additionalPartyFax", ""))
    can.drawString(100, 256, data.get("additionalPartyEmail", ""))

    can.drawString(100, 230, data.get("billedPartyName", ""))
    can.drawString(375, 230, data.get("billedPartyCompany", ""))
    can.drawString(100, 218, data.get("billedPartyAddress", ""))
    can.drawString(375, 218, data.get("billedPartyCity", ""))
    can.drawString(450, 218, data.get("billedPartyState", ""))
    can.drawString(500, 218, str(data.get("billedPartyZipCode", "")))
    can.drawString(100, 205, data.get("billedPartyPhone", ""))
    can.drawString(375, 205, data.get("billedPartyFax", ""))
    can.drawString(100, 193, data.get("billedPartyEmail", ""))
    can.drawString(375, 193, data.get("billedPartyJurisdiction", ""))

    can.drawString(100, 156, data.get("insuranceIdentifier", ""))
    can.drawString(375, 156, data.get("caseNumber", ""))
    can.drawString(100, 145, data.get("authorizedVisits", ""))
    can.drawString(210, 145, data.get("authorizedExp", ""))

    can.drawString(210, 130, data.get("policyHolderName", ""))
    can.drawString(500, 130, data.get("policyHolderRelationship", ""))
    phdob = data.get("phdob", "")
    if dob:
        formatted_phdob = phdob[:10]  # Extracts the first 10 characters
        can.drawString(210, 110, formatted_phdob)
    can.drawString(370, 118, data.get("policyHolderAddress", ""))
    can.drawString(370, 106, data.get("policyHolderCity", ""))
    can.drawString(440, 106, data.get("policyHolderState", ""))
    can.drawString(470, 106, data.get("policyHolderZipCode", ""))
    benefits = data.get("benefitsExplained", "")
    if benefits:
        if benefits == 'Yes':
            can.drawString(375, 93, "X")
        elif benefits == 'No':
            can.drawString(455, 93, "X")
        elif benefits == 'NA':
            can.setFont("Helvetica", 30)
            can.drawString(507, 88, "O")
            can.setFont("Helvetica", 7)
    
    can.drawString(100, 68, data.get("employerName", ""))
    can.drawString(375, 68, data.get("patientPosition", ""))
    can.drawString(100, 55, data.get("patientEmployerContact", ""))
    can.drawString(375, 55, data.get("patientEmployerPhone", ""))

    dateOfReferral = data.get("dateOfReferral", "")
    if dateOfReferral:
        formatted_dateOfReferral = dateOfReferral[:10]  # Extracts the first 10 characters
        can.drawString(100, 26, formatted_dateOfReferral)
    dateOfRevision = data.get("dateOfRevision", "")
    if dateOfRevision:
        formatted_dateOfRevision = dateOfRevision[:10]  # Extracts the first 10 characters
        can.drawString(375, 26, formatted_dateOfRevision)
    can.drawString(375, 40, data.get("appointmentDate", ""))
    can.drawString(500, 40, data.get("appointmentTime", ""))
    can.drawString(100, 40, data.get("service", ""))


    
    # Add more fields as per your form

    can.save()

    packet.seek(0)
    new_pdf = PdfReader(packet)
    page = reader.pages[0]  # Assuming a single-page PDF
    page.merge_page(new_pdf.pages[0])
    writer.add_page(page)

    pdf_output = io.BytesIO()
    writer.write(pdf_output)
    pdf_output.seek(0)

    return send_file(
        pdf_output, 
        mimetype='application/pdf', 
        as_attachment=True, 
        download_name='filled_pdf.pdf'
    )


@app.route('/patient/<ssn>', methods=['GET'])
def get_patient_details(ssn):
    print(ssn + "here")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM PatientForms WHERE patientSSN = ?
    ''', ssn)
    patient_data = cursor.fetchone()
    if patient_data:
        result = {column_name: patient_data[i] for i, column_name in enumerate([
            'PatientFormId', 'patientFirstName', 'patientLastName', 'patientSSN', 
            'gender', 'dob', 'doi', 'field2', 'patientPhoneNumber', 'patientEmail', 
            'patientAddress', 'patientZipCode', 'patientState', 'patientCity', 
            'referralType', 'diagnosis', 'referredBy', 'icd10', 'therapistInitials', 
            'medicalRecordsSend', 'jobDescriptionSend', 'otherDataSend', 'returnToWork', 
            'vocationalPlacement', 'whwcOptional', 'otherReferralGoals', 
            'practitionerName', 'practitionerPractice', 'practitionerAddress', 
            'practitionerZipCode', 'practitionerCity', 'practitionerState', 
            'practitionerPhone', 'practitionerEmail', 'practitionerFax', 
            'practitionerContactStyle', 'practitionerReportStyle', 'caseManagerName', 
            'caseManagerPractice', 'caseManagerAddress', 'caseManagerZipCode', 
            'caseManagerCity', 'caseManagerState', 'caseManagerPhone', 
            'caseManagerEmail', 'caseManagerFax', 'caseManagerContactStyle', 
            'caseManagerReportStyle', 'atfcName', 'atfcFirm', 'atfcParalegal', 
            'atfcAddress', 'atfcZipCode', 'atfcCity', 'atfcState', 'atfcPhone', 
            'atfcEmail', 'atfcFax', 'atfcContactStyle', 'atfcReportStyle', 
            'additionalPartyType', 'additionalPartyName', 'additionalPartyCompany', 
            'additionalPartyAddress', 'additionalPartyZipCode', 'additionalPartyCity', 
            'additionalPartyState', 'additionalPartyPhone', 'additionalPartyEmail', 
            'additionalPartyFax', 'additionalPartyContactStyle', 'additionalPartyReportStyle', 
            'billedPartyName', 'billedPartyJurisdiction', 'billedPartyCompany', 
            'billedPartyAddress', 'billedPartyZipCode', 'billedPartyCity', 
            'billedPartyState', 'billedPartyPhone', 'billedPartyEmail', 'billedPartyFax', 
            'billedPartyContactStyle', 'billedPartyReportStyle', 'insuranceIdentifier', 
            'secondaryInsuranceIdentifier', 'authorizedVisits', 'authorizedExp', 
            'caseNumber', 'reasonForVisit', 'policyHolderName', 'policyHolderRelationship', 
            'phdob', 'policyHolderAddress', 'policyHolderZipCode', 'policyHolderCity', 
            'policyHolderState', 'benefitsExplained', 'patientPosition', 
            'patientEmployerContact', 'patientEmployerPhone', 'emergencyContactName', 
            'emergencyContactPhone', 'emergencyContactRelationship', 'dateOfReferral', 
            'dateOfRevision', 'appointmentDate', 'appointmentTime', 'referralNotes', 
            'employerName', 'deadReferralReason'
        ])}
    else:
        result = {'error': 'Patient not found'}
    cursor.close()
    conn.close()
    return jsonify(result)

def format_iso8601_to_sql(date_str):
    if date_str:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00")).strftime('%Y-%m-%d %H:%M:%S')
    return None

def format_date_to_sql(date_str):
    if date_str:
        try:
            # First, try parsing as ISO 8601 format
            return datetime.fromisoformat(date_str.replace("Z", "+00:00")).strftime('%Y-%m-%d %H:%M:%S')
        except ValueError:
            # If that fails, try parsing as HTTP-style date
            try:
                dt = parsedate_to_datetime(date_str)
                return dt.strftime('%Y-%m-%d %H:%M:%S')
            except Exception as e:
                print(f"Error parsing date: {e}")
                return None
    return None

@app.route('/update_patient/<ssn>', methods=['PUT'])
def update_patient(ssn):
    try:
        patient_data = request.json
        patient_data['dateOfRevision'] = format_date_to_sql(patient_data['dateOfRevision'])
        patient_data['authorizedExp'] = format_date_to_sql(patient_data['authorizedExp'])
        patient_data['dateOfReferral'] = format_date_to_sql(patient_data['dateOfReferral'])
        patient_data['dob'] = format_date_to_sql(patient_data['dob'])  # Date of Birth
        patient_data['doi'] = format_date_to_sql(patient_data['doi'])  # Date of Injury
        patient_data['phdob'] = format_date_to_sql(patient_data['phdob'])  # Policy Holder Date of Birth
        print(patient_data)
        conn = get_db_connection()
        cursor = conn.cursor()
        update_query = '''
        UPDATE PatientForms SET 
        patientFirstName = ?, patientLastName = ?, gender = ?, dob = ?, doi = ?, 
        field2 = ?, patientPhoneNumber = ?, patientEmail = ?, patientAddress = ?, 
        patientZipCode = ?, patientState = ?, patientCity = ?, referralType = ?, 
        diagnosis = ?, referredBy = ?, icd10 = ?, therapistInitials = ?, 
        medicalRecordsSend = ?, jobDescriptionSend = ?, otherDataSend = ?, 
        returnToWork = ?, vocationalPlacement = ?, whwcOptional = ?, 
        otherReferralGoals = ?, practitionerName = ?, practitionerPractice = ?, 
        practitionerAddress = ?, practitionerZipCode = ?, practitionerCity = ?, 
        practitionerState = ?, practitionerPhone = ?, practitionerEmail = ?, 
        practitionerFax = ?, practitionerContactStyle = ?, practitionerReportStyle = ?, 
        caseManagerName = ?, caseManagerPractice = ?, caseManagerAddress = ?, 
        caseManagerZipCode = ?, caseManagerCity = ?, caseManagerState = ?, 
        caseManagerPhone = ?, caseManagerEmail = ?, caseManagerFax = ?, 
        caseManagerContactStyle = ?, caseManagerReportStyle = ?, atfcName = ?, 
        atfcFirm = ?, atfcParalegal = ?, atfcAddress = ?, atfcZipCode = ?, 
        atfcCity = ?, atfcState = ?, atfcPhone = ?, atfcEmail = ?, atfcFax = ?, 
        atfcContactStyle = ?, atfcReportStyle = ?, additionalPartyType = ?, 
        additionalPartyName = ?, additionalPartyCompany = ?, additionalPartyAddress = ?, 
        additionalPartyZipCode = ?, additionalPartyCity = ?, additionalPartyState = ?, 
        additionalPartyPhone = ?, additionalPartyEmail = ?, additionalPartyFax = ?, 
        additionalPartyContactStyle = ?, additionalPartyReportStyle = ?, billedPartyName = ?, 
        billedPartyJurisdiction = ?, billedPartyCompany = ?, billedPartyAddress = ?, 
        billedPartyZipCode = ?, billedPartyCity = ?, billedPartyState = ?, 
        billedPartyPhone = ?, billedPartyEmail = ?, billedPartyFax = ?, 
        billedPartyContactStyle = ?, billedPartyReportStyle = ?, insuranceIdentifier = ?, 
        secondaryInsuranceIdentifier = ?, authorizedVisits = ?, authorizedExp = ?, 
        caseNumber = ?, reasonForVisit = ?, policyHolderName = ?, policyHolderRelationship = ?, 
        phdob = ?, policyHolderAddress = ?, policyHolderZipCode = ?, policyHolderCity = ?, 
        policyHolderState = ?, benefitsExplained = ?, patientPosition = ?, 
        patientEmployerContact = ?, patientEmployerPhone = ?, emergencyContactName = ?, 
        emergencyContactPhone = ?, emergencyContactRelationship = ?, dateOfReferral = ?, 
        dateOfRevision = ?, appointmentDate = ?, appointmentTime = ?, referralNotes = ?, 
        employerName = ?, deadReferralReason = ?
        WHERE patientSSN = ?
        '''
        cursor.execute(update_query, (
            patient_data['patientFirstName'], patient_data['patientLastName'], patient_data['gender'], 
            patient_data['dob'], patient_data['doi'], patient_data['field2'], 
            patient_data['patientPhoneNumber'], patient_data['patientEmail'], patient_data['patientAddress'], 
            patient_data['patientZipCode'], patient_data['patientState'], patient_data['patientCity'], 
            patient_data['referralType'], patient_data['diagnosis'], patient_data['referredBy'], 
            patient_data['icd10'], patient_data['therapistInitials'], patient_data['medicalRecordsSend'], 
            patient_data['jobDescriptionSend'], patient_data['otherDataSend'], patient_data['returnToWork'], 
            patient_data['vocationalPlacement'], patient_data['whwcOptional'], patient_data['otherReferralGoals'], 
            patient_data['practitionerName'], patient_data['practitionerPractice'], patient_data['practitionerAddress'], 
            patient_data['practitionerZipCode'], patient_data['practitionerCity'], patient_data['practitionerState'], 
            patient_data['practitionerPhone'], patient_data['practitionerEmail'], patient_data['practitionerFax'], 
            patient_data['practitionerContactStyle'], patient_data['practitionerReportStyle'], patient_data['caseManagerName'], 
            patient_data['caseManagerPractice'], patient_data['caseManagerAddress'], patient_data['caseManagerZipCode'], 
            patient_data['caseManagerCity'], patient_data['caseManagerState'], patient_data['caseManagerPhone'], 
            patient_data['caseManagerEmail'], patient_data['caseManagerFax'], patient_data['caseManagerContactStyle'], 
            patient_data['caseManagerReportStyle'], patient_data['atfcName'], patient_data['atfcFirm'], 
            patient_data['atfcParalegal'], patient_data['atfcAddress'], patient_data['atfcZipCode'], patient_data['atfcCity'], 
            patient_data['atfcState'], patient_data['atfcPhone'], patient_data['atfcEmail'], patient_data['atfcFax'], 
            patient_data['atfcContactStyle'], patient_data['atfcReportStyle'], patient_data['additionalPartyType'], 
            patient_data['additionalPartyName'], patient_data['additionalPartyCompany'], patient_data['additionalPartyAddress'], 
            patient_data['additionalPartyZipCode'], patient_data['additionalPartyCity'], patient_data['additionalPartyState'], 
            patient_data['additionalPartyPhone'], patient_data['additionalPartyEmail'], patient_data['additionalPartyFax'], 
            patient_data['additionalPartyContactStyle'], patient_data['additionalPartyReportStyle'], patient_data['billedPartyName'], 
            patient_data['billedPartyJurisdiction'], patient_data['billedPartyCompany'], patient_data['billedPartyAddress'], 
            patient_data['billedPartyZipCode'], patient_data['billedPartyCity'], patient_data['billedPartyState'], 
            patient_data['billedPartyPhone'], patient_data['billedPartyEmail'], patient_data['billedPartyFax'], 
            patient_data['billedPartyContactStyle'], patient_data['billedPartyReportStyle'], patient_data['insuranceIdentifier'], 
            patient_data['secondaryInsuranceIdentifier'], patient_data['authorizedVisits'], patient_data['authorizedExp'], 
            patient_data['caseNumber'], patient_data['reasonForVisit'], patient_data['policyHolderName'], 
            patient_data['policyHolderRelationship'], patient_data['phdob'], patient_data['policyHolderAddress'], 
            patient_data['policyHolderZipCode'], patient_data['policyHolderCity'], patient_data['policyHolderState'], 
            patient_data['benefitsExplained'], patient_data['patientPosition'], patient_data['patientEmployerContact'], 
            patient_data['patientEmployerPhone'], patient_data['emergencyContactName'], patient_data['emergencyContactPhone'], 
            patient_data['emergencyContactRelationship'], patient_data['dateOfReferral'], patient_data['dateOfRevision'], 
            patient_data['appointmentDate'], patient_data['appointmentTime'], patient_data['referralNotes'], 
            patient_data['employerName'], patient_data['deadReferralReason'],
            ssn))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error updating patient: {e}")
        return jsonify({"error": str(e)}), 500








if __name__ == '__main__':
    app.run(debug=True)