const Database = require('./database');
const express = require('express');
const cors = require('cors');

const app = express();
const db = new Database();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

class DataToBeAdded {
    constructor(newSerialNumber, newProvider, newExpiryDate, newPrice) {
        this.Number = newSerialNumber;
        this.Provider = newProvider;
        this.Rent = newExpiryDate;
        this.Cost = newPrice;
    }
  }


// POST route at /license
app.post('/license', (req, res) => {
    try {
        console.log(req.body);
        var data = new DataToBeAdded(req.body.message.newSerialNumber, req.body.message.newProvider, req.body.message.newExpiryDate, req.body.message.newPrice)
        db.insert(data); // Insert the data from the request body
        res.status(200).json({ message: 'License added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: 'Bad Request' });
    }
});

// GET route at the root
app.get('/getLicenses', async (req, res) => {
    try {
      let licenses = await db.getLicenses();
      res.json({ licenses: licenses });
    } catch (error) {
      console.error('Failed to retrieve licenses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/deleteLicense/:number', (req, res) => {
    const licenseNumber = req.params.number;
    db.deleteLicense(licenseNumber)
      .then(results => {
        res.status(200).json({ message: 'License deleted successfully', results });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error deleting license', details: error });
      });
  });
 

// Start the server on port 9000
app.listen(9000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:9000');
});
