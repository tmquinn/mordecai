const path = require('path');
const game = require('./game');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/:gameId', function (req, res) {
  let gameAnswer = game.gameAnswer(req.params.gameId);
  let guess = req.query.guess.split(',').map(item => +item);
  let result = game.diff(gameAnswer, guess);

  res.send(result);
});

app.listen(4200, function () {
  console.log('Example app listening on port 4200!');
})
