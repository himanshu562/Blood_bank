const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5500;

// MongoDB Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle form submission
app.post('/donor_register', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();

        // Access the database and collection
        const database = client.db('blood_bank_db');
        const collection = database.collection('donors');

        // Extract data from request body
        const { name, age, gender, blood_group, address, city, email, password } = req.body;

        // Insert donor data into the collection
        const result = await collection.insertOne({ name, age, gender, blood_group, address, city, email, password });

        // Respond with success message
        res.status(201).json({ message: 'Donor registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
