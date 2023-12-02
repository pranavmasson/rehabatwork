from flask import Flask, jsonify
import pyodbc

app = Flask(__name__)

#RAWSVR-DB\ADA
#rawsvr-db.rehabatwork.com
# Database configuration
server = 'RAWSVR-DB\ADA'  # e.g., 'localhost\instancename' or 'myserver.database.windows.net'
database = 'PatientForm'  # e.g., 'mydatabase'
username = 'sa'  # e.g., 'username'
password = '$Monday01'  # e.g., 'password'
driver = '{ODBC Driver 18 for SQL Server}'  # e.g., '{SQL Server}' - depending on your ODBC driver's name

# Establish a database connection and return cursor
def get_db_connection():
    conn = pyodbc.connect(
        'DRIVER=' + driver + ';SERVER=' + server +
        ';DATABASE=' + database + ';UID=' + username +
        ';PWD=' + password)
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM your_table')  # Replace 'your_table' with your actual table name
    data = cursor.fetchall()
    # Transform query results into a list of dictionaries (or any format you prefer)
    result = [{'column1': row[0], 'column2': row[1]} for row in data]  # Edit column names as appropriate
    cursor.close()
    conn.close()
    return jsonify(result)

# Route to fetch dead referral reasons
@app.route('/dead_referral_reasons')
def get_dead_referral_reasons():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT label FROM dead_referral_reasons')  # Ensure the table name is correctly referenced
    referrals = cursor.fetchall()
    print(referrals)

    # Extract the 'label' values into a list of strings
    options = [row['label'] for row in referrals]  # Adjust based on your actual result structure
    options.append('Other')
    
    cursor.close()
    conn.close()
    return jsonify(options)

# Route to fetch attorney claimants
@app.route('/attorney_claimant')
def get_attorney_claimant():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Full_Name FROM attorneys')  # Ensure the table name is correctly referenced
    attorneys = cursor.fetchall()

    # Extract the 'label' values into a list of strings
    options = [row['Full_Name'] for row in attorneys]  # Adjust based on your actual result structure
    
    cursor.close()
    conn.close()
    return jsonify(options)

# Route to fetch billed parties
@app.route('/billed_party')
def get_billed_party():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Name FROM billed_party')  # Ensure the table name is correctly referenced
    billed = cursor.fetchall()

    # Extract the 'label' values into a list of strings
    options = [row['Name'] for row in billed]  # Adjust based on your actual result structure
    
    cursor.close()
    conn.close()
    return jsonify(options)

# Route to fetch billed parties
@app.route('/case-managers')
def get_managers():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Full_Name FROM case_managers')  # Ensure the table name is correctly referenced
    case_managers = cursor.fetchall()

    # Extract the 'label' values into a list of strings
    options = [row['Full_Name'] for row in case_managers]  # Adjust based on your actual result structure
    
    cursor.close()
    conn.close()
    return jsonify(options)

# Route to fetch billed parties
@app.route('/employers')
def get_employers():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Name FROM employers')  # Ensure the table name is correctly referenced
    employers = cursor.fetchall()

    # Extract the 'label' values into a list of strings
    options = [row['Name'] for row in employers]  # Adjust based on your actual result structure
    
    cursor.close()
    conn.close()
    return jsonify(options)

# Route to fetch billed parties
@app.route('/practitioners')
def get_practitioners():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only the 'label' column from the 'dead-referral-reasons' table
    cursor.execute('SELECT Full_Name FROM practitioners')  # Ensure the table name is correctly referenced
    practitioners = cursor.fetchall()

    # Extract the 'label' values into a list of strings
    options = [row['Full_Name'] for row in practitioners]  # Adjust based on your actual result structure
    
    cursor.close()
    conn.close()
    return jsonify(options)


if __name__ == '__main__':
    app.run(debug=True)
