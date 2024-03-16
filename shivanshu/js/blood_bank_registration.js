const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'data/' }); // Specify upload directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html'); // Serve register.html
});

app.post('/register', upload.none(), (req, res) => { // No file upload here
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;

  const userData = `${userName},${password},${email}\n`;

  // Check if data file exists, create it if not
  if (!fs.existsSync('data/users.csv')) {
    fs.writeFileSync('data/users.csv', 'Username,Password,Email\n'); // Header row
  }

  fs.appendFile('data/users.csv', userData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Registration failed!');
    } else {
      res.send('Registration successful!');
    }
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
