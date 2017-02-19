"use strict";

const answerPegs = 4;
const numColors = 6;
let guessCurrent = [-1, -1, -1, -1];
const guessHistory = [];
let selectedHole = 0;
let gameId = 0;

function selectGuess(newHole) {
  selectedHole = newHole;
  $('.guess-current .row')
    .children('div.code-peg-hole')
    .each(function (index, hole) {
      if (index === selectedHole) {
        $(hole).addClass('selected');
      } else {
        $(hole).removeClass('selected');
      }
    });
}

function clearGuessColor(currentPeg) {
  $(currentPeg).removeClass(() => {
    const classes = [];
    for (let i = 0; i < numColors; i += 1) {
      classes[i] = `p-${i}`;
    }
    return classes.join(' ');
  });
}

function setGuessHole(color) {
  if (selectedHole !== -1) {
    guessCurrent[selectedHole] = color;

    const currentPeg = $(`.guess-current .row`).children().eq(selectedHole).children('.code-peg');
    clearGuessColor(currentPeg);

    currentPeg.addClass(`p-${color}`);
  }

  if (guessCurrent.indexOf(-1) === -1) {
    $(`.guess-current .submit-pane`).css('visibility', 'visible');
  }

  //advance to next hole
  selectGuess(selectedHole >= answerPegs - 1 ? 0 : selectedHole + 1);
}

function resetGuessCurrent() {
  const guessCurrentRow = $('.guess-current .row');
  guessCurrentRow.find('.code-peg').each(function (index, item) {
    clearGuessColor(item);
  });
  guessCurrentRow.children('.submit-pane').css('visibility', 'hidden');

  selectGuess(0);
  guessCurrent = [-1, -1, -1, -1];
}

function submitGuess() {
  gameId = gameId || Math.round(Math.random() * (1E+10 - 1) + 1);

  $.get(`api/${gameId}`, { guess: guessCurrent }, function (result) {
    addGuessHistoryRow(result);
    resetGuessCurrent();
  });
}

function addGuessCurrentRow() {
  const row = $('<div class="row flex"></div>');

  // Add code pegs
  for (let i = 0; i < answerPegs; i += 1) {
    let hole = $('<div class="code-peg-hole"><div class="code-peg"></div></div>');

    //Guess Current Click Handler
    hole.click({ hole: i }, function (evt) {
      selectGuess(evt.data.hole);
    });

    row.append(hole);
  }

  let submit = $('<div class="submit-pane"></div>').css('visibility', 'hidden');
  submit.click(function () {
    submitGuess();
  });

  row.append(submit);

  $('.guess-current').append(row);
  selectGuess(0);
}

function addGuessHistoryRow(result) {
  const row = $('<div class="row flex"></div>');

  for (let i = 0; i < answerPegs; i += 1) {
    row.append(`<div class="code-peg-hole"><div class="code-peg p-${guessCurrent[i]}"></div></div>`)
  }

  //Key pegs
  const keyPeg = $('<div class="code-peg-hole flex"><div>');

  for (let i = 0; i < result.black; i += 1) {
    keyPeg.append('<div class="key-peg-hole"><div class="key-peg black"></div></div>');
  }

  for (let i = 0; i < result.white; i += 1) {
    keyPeg.append('<div class="key-peg-hole"><div class="key-peg white"></div></div>');
  }

  row.append(keyPeg);

  guessHistory.push(addGuessCurrentRow);

  $('.guess-history').prepend(row);
}

function listenOnCodePegs() {
  $('.code-pegs')
    .children('div.code-peg-hole')
    .each(function (index, hole) {
      $(hole).click({ hole: index }, (evt) => {
        //TODO: Check that I am not already selected
        setGuessHole(evt.data.hole);
      });
    });
}

$(function () {
  addGuessCurrentRow();
  listenOnCodePegs();
});
