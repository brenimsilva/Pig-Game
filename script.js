'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

function switchPlayers() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //Real Switch
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Initial Values
let scores, currentScore, activePlayer, playing, winPoints;

// Reset Game
function gameInit() {
  winPoints = 100;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
gameInit();

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 3;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true,
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(scores);
    } else {
      //Switch to next player
      switchPlayers();
    }
  }
});

// HOLD BUTTON EVENT
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //
    if (scores[activePlayer] >= winPoints) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      console.log(`Player${activePlayer + 1} wins!`);
      score0El.textContent = scores[0] >= 100 ? 'WIN' : 'LOSE';
      score1El.textContent = scores[1] >= 100 ? 'WIN' : 'LOSE';
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayers();
    }
  }
});

// NEW GAME BUTTON EVENT

btnNew.addEventListener('click', function () {
  gameInit();
});
