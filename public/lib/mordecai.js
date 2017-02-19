"use strict";

const answerPegs = 4;
const numColors = 6;
const guessCurrent = [-1, -1, -1, -1];
const guessHistory = [];
let selectedHole = -1;
let gameId = 0;

function setGuessHole(color) {
  if (selectedHole !== -1) {
    guessCurrent[selectedHole] = color;

    const currentPeg = $(`.guess-current .row`).children().eq(selectedHole).children('.code-peg');

    currentPeg.removeClass(() => {
      const classes = [];
      for (let i = 0; i < numColors; i += 1) {
        classes[i] = `p-${i}`;
      }
      return classes.join(' ');
    });

    currentPeg.addClass(`p-${color}`);
  }

  if (guessCurrent.indexOf(-1) === -1) {
    $(`.guess-current .submit-pane`).css('visibility', 'visible');
  }
}

function submitGuess() {
  gameId = gameId || Math.round(Math.random() * (1E+10 - 1) + 1);

  $.get(`api/${gameId}`, { guess: guessCurrent }, addGuessHistoryRow);
}

function addGuessCurrentRow() {
  const row = $('<div class="row flex"></div>');

  for (let i = 0; i < answerPegs; i += 1) {
    let hole = $('<div class="code-peg-hole"><div class="code-peg"></div></div>');

    //Guess Current Click Handler
    hole.click({ hole: i }, function (evt) {
      row.children().removeClass('selected');
      row.children().eq([evt.data.hole]).addClass('selected');
      selectedHole = evt.data.hole;
    });
    row.append(hole);
  }

  let submit = $('<div class="submit-pane"></div>').css('visibility', 'hidden');
  submit.click(function () {
    submitGuess();
  });

  row.append(submit);

  $('.guess-current').append(row);
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
