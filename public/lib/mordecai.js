"use strict";

const answerPegs = 4;
let currentGuess = new Array(4);
let selectedHole;

function setGuessHole(color) {
  currentGuess[selectedHole] = color;

  const row = $('.guess-current .row');
  row.children('div.code-peg-hole').each((index, item) => {
    item = $(item);
    item.removeClass(() => {
      let classes = [];
      for (let i = 0; i < answerPegs; i += 1) {
        classes[i] = `p-${i}`;
      }

      return classes.join(' ');
    });

    item.addClass(`p-${color}`);
  });
}

function addGuessCurrentRow() {
  const row = $('<div class="row flex"></div>');

  for (let i = 0; i <= answerPegs; i += 1) { 
    let hole = $('<div class="code-peg-hole"><div class="code-peg"></div></div>');
    hole.click({ hole: i }, function (evt) {
      row.children().removeClass('selected');
      row.children().eq([evt.data.hole]).addClass('selected');
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
    .forEach(function (hole, index) {
      hole.click({ hole: index }, (evt) => {
        //TODO: Check that I am not already selected
        setGuessHole(evt.data.hole);
      });
    });
}

$(function () {
  addGuessCurrentRow();
  // listenOnCodePegs();
});
