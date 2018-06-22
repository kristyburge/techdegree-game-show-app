// GAME RULES:
// track number of guesses the player misses
// if the player guesses wrong 5 times, lose game
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');

const ul = phrase.firstElementChild;
const li = ul.children;   // letters in the phrase
const phrasesArr = [
  'every cloud has a silver lining',
  'take chances and make mistakes',
  'happiness is an attitude',
  'life is a gift',
  'today is a new beginning'
];

const win = document.createElement('p');
win.classList.add('message');
win.textContent = 'Congratulations!!';

const lose = document.createElement('p');
lose.classList.add('message');
lose.textContent = 'Bummer! You lost this round. Play again?';

let guessesMissed, letterFound;

// Hide the overlay when the start button is clicked
startButton.addEventListener('click', function(){
  // Game states for overlay

  if (overlay.className === 'start') {
    // 1: start
    overlay.classList.remove('start');
    overlay.style.display = 'none';
  } else if (overlay.className === 'win') {
    // 2: win
    overlay.removeChild(win);
    overlay.classList.remove('win');
    overlay.style.display = 'none';
  } else if (overlay.className === 'lose') {
    // 3: lose`
    overlay.removeChild(lose);
    overlay.classList.remove('lose');
    overlay.style.display = 'none';
  }

  // initialize the game
  init();

});

// Generate a random phrase
function getRandomPhraseAsArray(arr){
  // remove 1 from the array length to get the max number (inclusive)
  const length = arr.length - 1;

  // generate a random number between 0 and length
  const choose = getRandomNumber(0, length);
  const currentPhrase = arr[choose];

  // split the phrase into array of individual characters
  const letters = currentPhrase.split('');

  return letters;
}

// Generate a random number
function getRandomNumber(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Set the game display
function addPhraseToDisplay(arr) {

  // loop through array of characters
  for (let i = 0; i < arr.length; i++) {
    const letter = arr[i];
    // for each character, create a list item
    const item = document.createElement('li');
    // put each character inside the list item
    item.textContent = letter;

    // if the character is NOT a space, add the class "letter" to the list item
    if (letter !== " ") {
      item.className = 'letter';
    } else {
      item.className = 'space';
    }

    // append the list item to the DOM (specifically to the #phrase ul )
    ul.appendChild(item);
  }
}

// Check if the letter chosen matches a letter in the phrase
function checkLetter(guessBtn) {
  // Loop through the characters in the phrase
  for (let i = 0; i < li.length; i++) {
    // Make sure a letter is chosen
    if ( li[i].classList.contains('letter') ) {

        // Check the textContent of the button to see if there's a match
        if (li[i].textContent === guessBtn) {
          // Add the 'show' class
          li[i].classList.add('show');
          // Save the correct guess
          letterFound = guessBtn;
        }
    }
  }

  // return the matching letter guessed correct;
  // otherwise, return null for incorrect guess
  return letterFound;
}

function checkWin(){
  //check if the number of letters with class “show” is equal to the number of letters with class “letters”.

// STEP 1:
  const listItemArray = document.querySelector('ul').children;

  let counterShow = 0;
  for (let i = 0; i < listItemArray.length; i++) {
    // check for the 'show' class
    if(listItemArray[i].classList.contains('show')) {
      counterShow += 1;
    }
  }

// STEP 2:
  let counterLetters = 0;
  for (let i = 0; i < listItemArray.length; i++) {
    // count the number of letters (exclude spaces) in the phrase
    if(listItemArray[i].classList.contains('letter')) {
      counterLetters += 1;
    }
  }
  // console.log(guessesMissed);

    // check for a win
    if ( counterShow === counterLetters ) {

      // wait for the animation to complete
      setTimeout(function(){
        // display win overlay
        overlay.style.display = 'flex';
        overlay.classList.add('win');
        overlay.appendChild(win);
      }, 2000);


    } else {
        // keep playing
        // console.log('checking to see if you won...');
        // console.log(guessesMissed);

          if ( guessesMissed < 5 ) {
              // keep playing
              // console.log('letters shown: ' + counterShow);
              // console.log('letters in phrase: ' + counterLetters);

          } else if (guessesMissed === 5) {

            // Give animation time to finish
            // Disable the rest of the buttons
            const buttons = document.querySelectorAll('#qwerty button');
            for (let i = 0; i < buttons.length; i++) {
              buttons[i].setAttribute('disabled', '');
            }

            setTimeout(function(){
              // Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class
              overlay.style.display = 'flex';
              overlay.classList.add('lose');
              overlay.appendChild(lose);
            }, 2000);

          }
    }
}


qwerty.addEventListener('click', function(evt){

  if (evt.target.tagName === 'BUTTON') {
    let character = evt.target.textContent;
    evt.target.setAttribute('disabled', '');
    evt.target.classList.add('chosen');
    checkLetter(character);
    if (letterFound === character) {
      // console.log('good job!');
      checkWin();
    } else {
      // remove a try
      // 1: increment the guessesMissed variable
      guessesMissed++;

      // 2: update the DOM - remove a try
      // get the OL
      const scoreboard = document.querySelector('#scoreboard').firstElementChild;

      // get all list items with class 'tries'
      const tries = document.querySelectorAll('.tries');
      scoreboard.removeChild( tries[0] );

      checkWin();
    }
  }

});


function init() {
  guessesMissed = 0;
  // Reset hearts
  var scoreboard = document.querySelector('#scoreboard').firstElementChild;
  var old = document.querySelectorAll('.tries');

  // clear screen
  for (var i = 0; i < old.length; i++) {
    scoreboard.removeChild(old[i]);
  }

  var listItem = document.createElement('li');
  var img = document.createElement('img');
  listItem.classList.add('tries');
  img.style.repeat = 'norepeat';
  img.src = "images/liveHeart.png";
  listItem.appendChild(img);

  for (let i = 0; i < 5; i++) {
    scoreboard.appendChild(listItem.cloneNode(true));
  }

  // Reset the keyboard
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++){
    buttons[i].removeAttribute('disabled');
    buttons[i].removeAttribute('class', 'chosen');
  }

  // Remove the old phrase
  var oldLetters = ul.querySelectorAll('li');
  // clear screen
  for (var i = 0; i < oldLetters.length; i++) {
    ul.removeChild( oldLetters[i] );
  }


  // save the result of the random phrase array split into characters
  let currentPhraseChar = getRandomPhraseAsArray(phrasesArr);
  // Call the function to add the random phrase to the DOM
  addPhraseToDisplay(currentPhraseChar);

}
