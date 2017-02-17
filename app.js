const path = require('path');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/:gameId', function (req, res) {
  let white = 0;
  let black = 0;

  res.send({white, black}); //{black: i, white: i}
})

app.listen(4200, function () {
  console.log('Example app listening on port 4200!');
})