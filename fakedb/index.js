const express = require('express');
const crypto = require('crypto');

const app = express();
const names = ['John','Steve','Bart','Ronnie','Doug','Scott','Larry']

app.get('/name', (req, res) => {
  res.send(names[crypto.randomInt(0, names.length - 1)])
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
