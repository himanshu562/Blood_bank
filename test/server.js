const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up storage destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Blood_bank/public/temp"); // Change 'uploads/' to your desired folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
