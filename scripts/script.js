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
function renderCards(){
    for (let i = 0; i < 20; i++){
        document.getElementById('cards').innerHTML += `
            <div class="card">
                <div class="front"></div>
                <div class="back"></div>
            </div>
        `
    }
}

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
    renderCards();
}
