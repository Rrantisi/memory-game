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

function generateRandom(){
    let tempValuesArr = [...valuesRef];
    for (let i = 0; i < 10; i++){
        let randomIdx = Math.floor(Math.random() * tempValuesArr.length);
        cardFrontArray.push(tempValuesArr[randomIdx]);
        tempValuesArr.splice(randomIdx, 1)
    }
    cardFrontArray = [...cardFrontArray, ...cardFrontArray];
    cardFrontArray.sort(() => Math.random() - 0.5)
    renderCardValues();
}

function renderCardValues(){
    const front = document.querySelectorAll('.front');
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < [...front].length; i++){
        [...front][i].innerText = `${cardFrontArray[i]}`
    }
    for (let i = 0; i < [...card].length; i++){
        [...card][i].setAttribute('value', `${cardFrontArray[i]}`)
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
