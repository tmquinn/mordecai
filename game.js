const randomSeed = require('random-seed');

function gameAnswer(seed) {

  const rand = randomSeed.create(seed);
  const r1 = rand(4);
  const r2 = rand(4);
  const r3 = rand(4);
  const r4 = rand(4);

  return ([r1, r2, r3, r4]);
}

function diff(seed, guess) {
  const answer = gameAnswer(seed);
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
console.log('answer', gameAnswer(1234));
console.log('guess ', [0,1,2,3]);
console.log(diff(1234, [0,1,2,3]));