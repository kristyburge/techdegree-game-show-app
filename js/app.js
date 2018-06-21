const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
// track number of guesses the player misses
// if the player guesses wrong 5 times, lose game
let guessesMissed = 0;
let letterFound;
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');


// Hide the overlay when the start button is clicked
startButton.addEventListener('click', function(){
  overlay.classList.remove('start');
  overlay.style.display = 'none';
});

const phrasesArr = [
  'every cloud has a silver lining',
  'take chances and make mistakes',
  'happiness is an attitude',
  'life is a gift',
  'today is a new beginning'
];

function getRandomPhraseAsArray(arr){
  // remove 1 from the array length to get the max number (inclusive)
  var length = arr.length - 1;

  // generate a random number between 0 and length
  var choose = getRandomNumber(0, length);
  var currentPhrase = arr[choose];

  // split the phrase into array of individual characters
  var letters = currentPhrase.split('');

  return letters;
}

function getRandomNumber(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// save the result of the random phrase array split into characters
const currentPhraseChar = getRandomPhraseAsArray(phrasesArr);
// Select the 'ul'
const div = document.querySelector('#phrase');
const ul = div.firstElementChild;

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

// Call the function to add the random phrase to the DOM
addPhraseToDisplay(currentPhraseChar);


// Check letter function
function checkLetter(guessBtn) {

  // letters in the phrase
  // array of li elements
  const li = ul.children;

  // Loop through the characters in the phrase
  for (var i = 0; i < li.length; i++) {
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
  var listItemArray = document.querySelector('ul').children;

  var counterShow = 0;
  for (var i = 0; i < listItemArray.length; i++) {
    // check for the 'show' class
    if(listItemArray[i].classList.contains('show')) {
      counterShow += 1;
    }
  }

// STEP 2:
  var counterLetters = 0;
  for (var i = 0; i < listItemArray.length; i++) {
    // count the number of letters (exclude spaces) in the phrase
    if(listItemArray[i].classList.contains('letter')) {
      counterLetters += 1;
    }
  }

  console.log(guessesMissed);
  // Check tries remaining
  if ( guessesMissed === 5 ) {
      // Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        // TODO: append some text
    } else {
      // keep playing
      // but first, check for a win
      if ( counterShow === counterLetters ) {
        // display win overlay
        overlay.style.display = 'flex';
        overlay.classList.add('win');
        // TODO: append some text



    }
  }
}

qwerty.addEventListener('click', function(evt){

  if (evt.target.tagName === 'BUTTON') {
    var character = evt.target.textContent;
    evt.target.setAttribute('disabled', '');
    evt.target.classList.add('chosen');
    checkLetter(character);
    if (letterFound === character) {
      console.log('good job!');
      checkWin();
    } else {
      // remove a try
      // 1: increment the guessesMissed variable
      guessesMissed++;
      console.log(guessesMissed);

      checkWin();

      // 2: update the DOM - remove a try
      // get the OL
      var scoreboard = document.querySelector('#scoreboard').firstElementChild;

      // get all list items with class 'tries'
      var tries = document.querySelectorAll('.tries');
      scoreboard.removeChild( tries[0] );
    }
  }



});
