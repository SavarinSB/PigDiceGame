'use strict';
//Storing DOM (from HTML TO DOM)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//vl.2(from Starting Element)
//SCOPE = define these Var (let) to be accessible from any function. removed let from Starting Element -> reassign elements inside those functions
let score, currentScore, activePlayer, playing;

const init = function () {
  //vl.1 Starting Element
  score0El.textContent = 0;
  score1El.textContent = 0;
  //when no hidden class in css
  // diceEl.style.display = 'none';
  // add hidden class in ONLY css (MANUALLY)
  diceEl.classList.add('hidden');
  //global current score,so not to get reset when clicking function
  currentScore = 0;
  //store scores in VAR an array, hold score player 0&1
  score = [0, 0];
  //active player 0 - score stored as in an array(first index is 0)
  //use let - we need to change player dynamically
  activePlayer = 0;
  //give state variable whether all btn freeze (game finish)
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  //RESET all current score & Switch Player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //change active player from 0->1 or 1->0
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Calling the function itself so the program run as before
init();

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    //use local scope cuz we need each time new No. when roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //can be removed
    //2. Display the dice roll
    diceEl.classList.remove('hidden');
    //use template literal to pull the pics and add No. from dice No.
    diceEl.src = `dice-${dice}.png`;
    //3.Check if it is 1?
    if (dice !== 1) {
      currentScore += dice; // current=current+dice roll (บวก ทบ)
      //current0El.textContent = currentScore; //b4 change to dynamic
      //building ID NAME dynamically
      // change to dynamically select the player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold Button Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.Check if player score is >=100
    if (score[activePlayer] >= 10) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.toggle('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
