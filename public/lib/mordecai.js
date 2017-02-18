let gameId;
const guesses = [];
const answerPegs = 4;

function handleHoleClick (event) {
  console.log(event.data.hole);
}

function addRow() {
  const board = $('.board').append('<div class="row"></div>');
  const keyPegHole = $('<div class="key-peg-hole"></div>').css('visibility', 'hidden');
  const row = board.children('.row').append(keyPegHole);
  for (let i = 0; i < answerPegs; i += 1) { 
    let hole = $(`<div class="code-peg-hole"><div class="code-peg"></div></div>`);
    hole.click({hole: i}, handleHoleClick);
    row.append(hole);
  }

}

$(function () {

  addRow();

  $('.start-button').click(function () {

  });
});
