/*----- constants -----*/
const valuesRef = ['🦘', '🦎', '🦁', '🦌', '🐹', '🦤', '🐌', '🦈', '🦉', '🐕',
                    '🐯', '🦄', '🐩', '🐻', '🦙', '🐳', '🦖', '🦝', '🐎', '🦒']

/*----- state variables -----*/
let seconds, minutes;
let lives;
let moves;
let bestScore;
let winner;
let gameOver;
let matchedArray;
let firstCard, secondCard;
let firstCardVal, secondCardVal;
let cardFrontArray = [];
let minutesRef = document.getElementById('minutes');
let secondsRef = document.getElementById('seconds');

/*----- cached elements -----*/
const playAgainBtn = document.getElementById('play-again');
const startGameBtn = document.getElementById('start');
const gameContainer = document.getElementById('game-container');
const messageContainer = document.getElementById('message-container');
const livesRef = document.getElementById('lives');
const scoreRef = document.getElementById('score');
let cards;

/*----- event listeners -----*/
startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', initialize);

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
    cards = document.querySelectorAll('.card');
    for (let i = 0; i < [...front].length; i++){
        [...front][i].innerText = `${cardFrontArray[i]}`
    }
    for (let i = 0; i < [...cards].length; i++){
        [...cards][i].setAttribute('value', `${cardFrontArray[i]}`)
    }
}

function startGame(){
    generateRandom()
    startGameBtn.style.visibility = 'hidden';
    cards = document.querySelectorAll('.card');
    [...cards].forEach(card => {
        card.style['transform'] = 'rotateY(180deg)' 
        setTimeout(() => {
            card.style['transform'] = 'rotateY(0deg)' 
            firstCard = ''
            secondCard = ''
        }, 3000)
    })
    setTimeout(() => {
        renderTime();
        playGame();
    }, 3000);
}

function playGame(){
    cards = document.querySelectorAll('.card');
    [...cards].forEach(card => card.addEventListener(('click'), () => {
        if(!matchedArray.includes(card.innerText)){
                if(card.className !== 'flipped'){
                    if (!firstCard){
                        firstCard = card
                        firstCardVal = firstCard.getAttribute('value');
                        card.classList.add('flipped')
                        card.style['transform'] = 'rotateY(180deg)'; 
                    } else {
                        secondCard = card;
                        secondCardVal = secondCard.getAttribute('value');
                        if(card.className.includes('flipped')) return;
                        card.classList.add('flipped')
                        card.style['transform'] = 'rotateY(180deg)';
                    } 
                    checkOneFlip();
                }
            checkMatch();
        }
    }))
}

function checkGameOver(){
    lives === 0 ? renderLoseMsg() : gameOver = false;
}

function checkWinState(){
    matchedArray.length === 20 ? renderWinMsg() : winner = false;
}

function renderLoseMsg(){
    lives = 0;
    messageContainer.classList.remove('hide');
    messageContainer.innerHTML = `
    <p>GAME OVER</p>
    `
    playAgainBtn.style.visibility = 'visible';
}

function renderWinMsg(){
    messageContainer.classList.remove('hide');
    messageContainer.innerHTML = `
    <p>YOU WON!!!</p>
    `
    playAgainBtn.style.visibility = 'visible';
}

function renderTime(){
    setInterval(() => {
        seconds++
        if(seconds >= 60){
            seconds = 0;
            minutes++
        }
        minutes < 10 ? minutesRef.innerText = `0${minutes}` : minutesRef.innerText = `${minutes}`;
        seconds < 10 ? secondsRef.innerText = `0${seconds}` : secondsRef.innerText = `${seconds}`;
    }, 1000)  
}

function updateStats(score, lives){
    scoreRef.innerText = `Your Score: ${score}`;
    livesRef.innerText = `Lives: ${lives}`
}

initialize()

function initialize(){
    seconds = 0;
    minutes = 0;
    lives = 12;
    moves = 0;
    winner = false;
    gameOver = false;
    matchedArray = [];
    firstCardVal = '';
    secondCardVal = '';
    cardFrontArray.splice(0);
    playAgainBtn.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'visible';
    messageContainer.classList.add('hide')
    render()
}

function render(){
    updateStats(moves, lives);
    checkWinState();
    checkGameOver();
}

window.onload = function(){
    renderCards();
}