const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/refil.html'); // Serve index.html
});

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (req.file) {
    const userName = req.body.userName;
    console.log(`User Name: ${userName}, File Name: ${req.file.filename}`);
    res.send('Upload successful!'); // Send success message
  } else {
    res.status(400).send('No file uploaded!'); // Send error message
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
