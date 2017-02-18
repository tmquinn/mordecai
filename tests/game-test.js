const assert = require('assert');
const game = require('../game');

describe('Game', function () {
  it('Should respond with proper diff', function () {
    const answerGuessResults = [
      [[0, 1, 2, 3], [0, 0, 0, 0], [1, 0]],
      [[0, 0, 0, 0], [0, 0, 0, 0], [4, 0]],
      [[1, 1, 1, 1], [2, 2, 2, 2], [0, 0]],
      [[1, 1, 2, 2], [2, 2, 1, 1], [0, 4]],
      [[1, 2, 3, 0], [1, 1, 1, 1], [1, 0]],
      [[0, 0, 0, 0], [0, 1, 0, 1], [2, 0]],
      [[0, 1, 2, 3], [1, 1, 1, 1], [1, 0]]
    ];

    answerGuessResults.forEach(config => {
      const answer = config[0];
      const guess = config[1];
      assert.deepEqual(game.diff(answer, guess), { black: config[2][0], white: config[2][1] }, `answer: ${answer}, guess: ${guess}`);
    });
  });
});
