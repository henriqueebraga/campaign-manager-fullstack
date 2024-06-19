const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Endpoint to get the data
app.get('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
