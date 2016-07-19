'use strict'

let goodreads, http, key, onRequest, secret, url, express, gr, credentials, fs;
fs = require('fs');
credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));

key = credentials.key;
secret = credentials.secret;

if (!key || !secret) {
  console.log('You need to set your Goodreads dev Key and Secret!');
  console.log('---');
  console.log('1) Get them at:  http://www.goodreads.com/api/keys');
  console.log('2) Set your key environment variable with: export GOODREADS_KEY=yourkey');
  console.log('3) Set your secret environment variable with: export GOODREADS_SECRET=yoursecret');
  console.log('---');
 
  process.exit(1);
}
goodreads = require('goodreads')


gr = new goodreads.client({
  'key': key,
  'secret': secret
});
http = require('http');
express = require('express')
let app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/books', function (req, res) {
      
gr.getSingleShelf({
  'userID': '40688141',
  'shelf': 'web',
  'page': 1,
  'per_page': 200
}, function (json) {
  if (json) {
    res.send(json);
    console.log(JSON.stringify(json));
    // return res.end();
  }
});

});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

