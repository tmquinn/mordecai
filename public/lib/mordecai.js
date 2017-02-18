let gameId;
const guesses = [];
const answerPegs = 4;
let currentGuess = new Array(4);
let selectedHole;
let currentRow;

function handleHoleClick(event) {
  selectedHole = event.data.hole;

  $(event.currentTarget).addClass('selected');
}

function addRow() {
  const board = $('.board').append('<div class="row"></div>');
  
  currentRow = board.children('.row').prepend($('<div class="key-peg-hole"></div>').css('visibility', 'hidden'));
  
  for (let i = 0; i < answerPegs; i += 1) {
    let hole = $(`<div class="code-peg-hole"><div class="code-peg"></div></div>`);
    hole.click({ hole: i }, handleHoleClick);
    currentRow.append(hole);
  }

  currentGuess = Array(answerPegs);
}

function setGuessHole(color) {
  currentGuess[selectedHole] = color;

  const row = $('.board .row:first-child');
  row.forEach((item, index) => {
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

  addRow();



  $('.start-button').click(function () {

  });
});
