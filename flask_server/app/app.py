from flask import Flask, jsonify
import pyodbc
from flask_cors import CORS

app = Flask(__name__)
import pyodbc

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

if __name__ == '__main__':
    app.run(debug=True)
