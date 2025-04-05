const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());

const filePath = path.join(__dirname, 'data.txt');

app.get('/get-text', (req, res) => {
  const number = parseInt(req.query.number, 10);

  if (isNaN(number) || number < 1 || number > 20) {
    return res.status(400).send({ error: 'Invalid number' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send({ error: 'Internal server error' });
    }

    const lines = data.split('\n');
    if (number > lines.length) {
      return res.status(404).send({ error: 'Text not found' });
    }

    res.send({ text: lines[number - 1] });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});