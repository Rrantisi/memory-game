/*----- constants -----*/
const valuesRef = ['🦘', '🦎', '🦁', '🦌', '🐹', '🦤', '🐌', '🦈', '🦉', '🐕',
                    '🐯', '🦄', '🐩', '🐻', '🦙', '🐳', '🦖', '🦝', '🐎', '🦒']

/*----- state variables -----*/
let seconds;
let lives;
let score;
let firstCard, secondCard;
let firstCardVal, secondCardVal;
let cardFrontArray;

/*----- cached elements -----*/
const playAgainBtn = document.getElementById('play-again');
const startGameBtn = document.getElementById('start')
/*----- event listeners -----*/

/*----- functions -----*/
initialize()
function initialize(){
    seconds = 0;
    lives = 10;
    score = 0;
    firstCard = '';
    secondCard = '';
    firstCardVal = '';
    secondCardVal = '';
    cardFrontArray = [];
    render();
}

function render(){
}
