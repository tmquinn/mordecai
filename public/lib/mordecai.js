"use strict";

const answerPegs = 4;
const numColors = 6;
let currentGuess = new Array(4);
let selectedHole = -1;

function setGuessHole(color) {
  if (selectedHole !== -1) {
    currentGuess[selectedHole] = color;

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
  submit.click(function (evt) {
    //TODO: Process click
  });

  row.append(submit);

  $('.guess-current').append(row);
}

function addGuessHistoryRow() {
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
