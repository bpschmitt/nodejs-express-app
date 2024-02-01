const express = require('express')
const http = require('http')
const newrelic = require('newrelic')

const app = express()
const port = 3000

const options = {
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  path: '/name',
  method: 'GET' 
};

app.get('/', (req, res) => {

  let name
  let version = process.env.APP_VERSION

  if (version == 'blue') {
    getName().then(data => {
      let text = 'Hello [' + data + ']!<br />App Version: ' + version
      console.log(text)
      res.send(text)
    }).catch(err => {
      console.error(err);
    });
  } else if (version == 'green') {
    let text = 'Hello World!<br />App Version: ' + version
    res.send(text)
  } else {
    let text = 'Hello World!<br />App Version: NO VERSION SUPPLIED'
    res.send(text)
  }
  
})

function getName() {
  return new Promise((resolve, reject) => {

    const req = http.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });

    });

    req.on('error', err => {
      reject(err);
    });

    req.end();
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}. DB Host: ${options.hostname}, DB Port: ${options.port}`)
})
