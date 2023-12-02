// database.js
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This will enable CORS for all routes and origins

// ... rest of your express app setup
//THIS IS WHERE WE ADD RIGHT


class Database {
  constructor() {
    // MySQL Connection Configuration
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root', // Default MySQL user
      password: '', // No password by default
      database: 'Licenses',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  

  insert(licenseData) {
    // SQL Query to Insert License
    const insertQuery = 'INSERT INTO fullLicenses (Number, Provider, Rent, Cost) VALUES (?, ?, ?, ?)';
    this.connection.query(insertQuery, [licenseData.Number, licenseData.Provider, licenseData.Rent, licenseData.Cost], (error, results) => {
      if (error) {
        console.error('Error inserting license:', error);
        return;
      }
      console.log('License inserted successfully:', results);
    });

  }

getLicenses() {
  return new Promise((resolve, reject) => {
    const getQuery = 'SELECT * FROM fullLicenses';
    this.connection.query(getQuery, [], (error, results) => {
      if (error) {
        console.error('Error retrieving licenses:', error);
        return reject(error);
      }
      console.log('Licenses retrieved successfully:', results);
      resolve(results);
    });
  });
  }

  deleteLicense(licenseNumber) {
    return new Promise((resolve, reject) => {
      // SQL Query to Delete a License
      const deleteQuery = 'DELETE FROM fullLicenses WHERE Number = ?';

      this.connection.query(deleteQuery, [licenseNumber], (error, results) => {
        if (error) {
          console.error('Error deleting license:', error);
          return reject(error);
        }
        console.log('License deleted successfully:', results);
        resolve(results);
      });
    });
  }


}






module.exports = Database;
