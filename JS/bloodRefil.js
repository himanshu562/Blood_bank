const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for both PDF files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Blood_bank/public/temp"); // Change 'uploads/' to your desired folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Initialize multer upload middleware for both files
const upload = multer({ storage: storage });

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/bloodRefil.html'));
});

// Handle form submission with validation and file uploads
app.post('/submit', upload.fields([{ name: 'pdfConsent' }, { name: 'pdfReport' }]), (req, res) => {
    const bloodGroup = req.body.bloodGroup;
    const amount = req.body.amount;
    const pdfConsentFile = req.files.pdfConsent;
    const pdfReportFile = req.files.pdfReport;

    // Validate form fields
    if (!bloodGroup || !amount || !pdfConsentFile || !pdfReportFile) {
        return res.status(400).send('Please fill in all required fields and upload both PDFs.');
    }

    // Process form data and uploaded files (replace with your actual logic)
    console.log('Form submitted with:', bloodGroup, amount, pdfConsentFile, pdfReportFile);

    res.send('Form submitted successfully!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// const bloodGroupSelect = document.getElementById('blood-group');
// const amountInput = document.getElementById('amount');
// const pdfConsentInput = document.getElementById('pdf-file-consent');
// const pdfReportInput = document.getElementById('pdf-file-report');
// const submitButton = document.getElementById('submitButton');

// function checkAllFields() {
//   // Check blood group selection
//   if (bloodGroupSelect.value === '') {
//     return false;
//   }

//   // Check amount field
//   if (amountInput.value === '') {
//     return false;
//   }

//   // Check both PDF uploads
//   if (!pdfConsentInput.files.length || !pdfReportInput.files.length) {
//     return false;
//   }

//   return true;
// }

// submitButton.addEventListener('click', (event) => {
//   // Prevent default submission
//   event.preventDefault();

//   // Check if all fields are filled
//   if (checkAllFields()) {
//     // Submit the form (redirect or use AJAX)
//     console.log('Submitting form...'); // Replace with actual submission logic
//   } else {
//     // Display an error message
//     alert('Please fill in all required fields and upload both PDFs.');
//   }
// });

// // Enable submit button only when both PDFs are uploaded
// pdfConsentInput.addEventListener('change', () => {
//   submitButton.disabled = !checkAllFields();
// });

// pdfReportInput.addEventListener('change', () => {
//   submitButton.disabled = !checkAllFields();
// });
