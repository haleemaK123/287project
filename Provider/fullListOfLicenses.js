
const mysql = require('mysql2');

// MySQL Connection Configuration
const connection = mysql.createConnection({
  host: 'localhost',
  //user: 'your_mysql_username',
  //password: 'your_mysql_password',
  user: 'root', // Default MySQL user
  password: '', // No password by default
  database: 'fullLicenses',
});

//license exmaples
const LicenseData = {
  Number: '123456789',
  Provider: 'Macrohard',
  Rent: '14',
  Cost: '20'

}

// SQL Query to Insert License
const insertQuery = 'INSERT INTO fullLicenses (Number,Provider,Rent,Cost) VALUES (?, ?,?,?)';

// Connect to MySQL and Insert License
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  
    // Insert license
    connection.query(insertQuery, [LicenseData.Number, LicenseData.Provider, LicenseData.Rent, LicenseData.Cost], (error, results) => {
      if (error) {
        console.error('Error inserting license:', error);
      } else {
        console.log('License inserted successfully:', results);
      }
  
      // Close the MySQL connection inside the callback
      connection.end();
    });
  });
  