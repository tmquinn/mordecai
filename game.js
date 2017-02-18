const randomSeed = require('random-seed');

function gameAnswer(seed) {

  const rand = randomSeed.create(seed);
  const r1 = rand(6);
  const r2 = rand(6);
  const r3 = rand(6);
  const r4 = rand(6);

  return ([r1, r2, r3, r4]);
}

function diff(answer, guess) {
  answer = answer.slice();
  guess = guess.slice();
  let result = { black: 0, white: 0 };

  for (let i = 0; i < answer.length; ++i) {
    if (guess[i] === answer[i]) {
      result.black += 1;
      guess[i] = answer[i] = -1;
    }
  }

  for (let i = 0; i < guess.length; ++i) {
    if (guess[i] !== -1) {
      let match = answer.indexOf(guess[i]);
      if (match !== -1) {
        result.white += 1;
        answer[match] = -1;
      }
    }
  }

  return result;
}

module.exports = { gameAnswer, diff };
