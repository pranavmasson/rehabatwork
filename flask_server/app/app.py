from flask import Flask, jsonify
import pyodbc

app = Flask(__name__)

# Database configuration
server = 'YOUR_SERVER'  # e.g., 'localhost\instancename' or 'myserver.database.windows.net'
database = 'YOUR_DATABASE'  # e.g., 'mydatabase'
username = 'YOUR_USERNAME'  # e.g., 'username'
password = 'YOUR_PASSWORD'  # e.g., 'password'
driver = '{ODBC Driver 17 for SQL Server}'  # e.g., '{SQL Server}' - depending on your ODBC driver's name

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
@app.route('/dead-referral-reasons')
def get_dead_referral_reasons():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT value, label FROM reasons')  # Replace 'reasons' with your actual table name
    reasons = cursor.fetchall()

    # Convert fetched data to a list of dictionaries
    options = [{'value': row.value, 'label': row.label} for row in reasons]
    
    cursor.close()
    conn.close()
    return jsonify(options)

if __name__ == '__main__':
    app.run(debug=True)
