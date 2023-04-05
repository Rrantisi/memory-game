/*----- constants -----*/
const valuesRef = ['🦘', '🦎', '🦁', '🦌', '🐹', '🦤', '🐌', '🦈', '🦉', '🐕',
                    '🐯', '🦄', '🐩', '🐻', '🦙', '🐳', '🦖', '🦝', '🐎', '🦒'];

const audio = {
    gameOverAudio: new Audio('game-over.mp3'),
    youWinAudio: new Audio('you-win.mp3'),
}

/*----- state variables -----*/
let lives, moves;
let winner, gameOver;
let timeLeft, timeOut;
let timeInterval, oneFlipInterval;
let firstCard, secondCard;
let firstCardVal, secondCardVal;
let matchedArray;
let cardFrontArray = [];

/*----- cached elements -----*/
const playAgainBtn = document.getElementById('play-again');
const startGameBtn = document.getElementById('start');
const messageContainer = document.getElementById('message-container');
let cards;

/*----- event listeners -----*/
startGameBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', initialize);

/*----- functions -----*/
function renderCards() {
    for (let i = 0; i < 20; i++){
        document.getElementById('cards').innerHTML += `
            <div class="card">
                <div class="front"></div>
                <div class="back"></div>
            </div>
        `
    }
}

function generateRandom() {
    let tempValuesArr = [...valuesRef];
    for (let i = 0; i < 10 ; i++){
        let randomIdx = Math.floor(Math.random() * tempValuesArr.length);
        cardFrontArray.push(tempValuesArr[randomIdx]);
        tempValuesArr.splice(randomIdx, 1)
    }
    cardFrontArray = [...cardFrontArray, ...cardFrontArray];
    cardFrontArray.sort(() => Math.random() - 0.5)
    renderCardValues();
}

function renderCardValues() {
    const front = document.querySelectorAll('.front');
    cards = document.querySelectorAll('.card');
    for (let i = 0; i < [...front].length; i++){
        [...front][i].innerText = `${cardFrontArray[i]}`
    }
    for (let i = 0; i < [...cards].length; i++){
        [...cards][i].setAttribute('value', `${cardFrontArray[i]}`);
    }
}

function startGame() {
    generateRandom()
    startGameBtn.style.visibility = 'hidden';
    cards = document.querySelectorAll('.card');
    [...cards].forEach(card => {
        card.style['transform'] = 'rotateY(180deg)' 
        setTimeout(() => {
            card.style['transform'] = 'rotateY(0deg)' 
            firstCard = ''
            secondCard = ''
        }, 4000)
    })
    setTimeout(() => {
        timeInterval = setInterval(renderTime, 1000)
        renderTime();
        playGame();
    }, 3000);
}

function playGame() {
    cards = document.querySelectorAll('.card');
    [...cards].forEach(card => card.addEventListener(('click'), () => {
        if(!matchedArray.includes(card.innerText)) {
            if(card.className !== 'flipped') {
                let cardFlipAudio = new Audio('card-flip.mp3')
                cardFlipAudio.play();            
                if (!firstCard){
                    firstCard = card
                    firstCardVal = firstCard.getAttribute('value');
                    flip(card);
                } else {
                    secondCard = card;
                    secondCardVal = secondCard.getAttribute('value');
                    if(card.className.includes('flipped')) return;
                    flip(card);
                } 
                checkOneFlip();
                checkMatch();
            }
        }
    }))
}

function flip(element){
    element.classList.add('flipped');
    element.style['transform'] = 'rotateY(180deg)'
}

function checkMatch() {
    if(!firstCard || !secondCard) return;
    if(firstCardVal === secondCardVal) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedArray.push(firstCard.innerText, secondCard.innerText)
        firstCard = '';
        secondCard = '';
        moves++
    } else {
        let [card1, card2] = [firstCard, secondCard]
        setTimeout(() => {
            card1.style['transform'] = 'rotateY(0deg)';
            card2.style['transform'] = 'rotateY(0deg)';  
        }, 600);  
        card1.classList.remove('flipped')
        card2.classList.remove('flipped') 
        firstCard = '';
        secondCard = '';
        moves++
        lives--
    }
    render();
}

function checkOneFlip() {
    if(!secondCard){
        oneFlipInterval = setTimeout(() => {
            let card = firstCard;
            if(firstCard) {
                card.classList.remove('flipped');
                card.style['transform'] = 'rotateY(0deg)';    
            }
            firstCard = '';
            secondCard = '';
            lives--;
            moves++;
            render();
        }, 3000)
    } else {
        clearTimeout(oneFlipInterval)
    }
    return;
}

function removeFlippedMatched(){
    cards = document.querySelectorAll('.card');
    [...cards].forEach((card)=> {
        if(card.className.includes('matched') || card.className.includes('flipped')){
            card.classList.remove('flipped');
            card.classList.remove('matched')
        }    
    })
}

function checkGameOver() {
    lives === 0 || timeOut ? renderLoseMsg() : gameOver = false;
    lives === 0 || timeOut ? clearInterval(timeInterval) : gameOver = false;
}

function checkWinState() {
    matchedArray.length === 20 ? (renderWinMsg(), winner = true) : winner = false;
    winner ? clearInterval(timeInterval) : winner = false;
}

function updateStats() {
    document.getElementById('moves').innerText = `Moves: ${moves}`;
    document.getElementById('lives').innerText = `Lives: ${lives}`
}

initialize()

function initialize() {
    lives = 12;
    moves = 0;
    winner = false;
    gameOver = false;
    timeOut = false;
    timeLeft = 45;
    matchedArray = [];
    firstCardVal = '';
    secondCardVal = '';
    cardFrontArray.splice(0);
    playAgainBtn.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'visible';
    messageContainer.classList.add('hide');
    removeFlippedMatched();
    render()
}

function render() {
    updateStats();
    checkWinState();
    checkGameOver();
}

function renderLoseMsg() {
    lives = 0;
    messageContainer.classList.remove('hide');
    messageContainer.innerHTML = `
    <h2>GAME OVER</h2>
    `
    audio.gameOverAudio.play();

    playAgainBtn.style.visibility = 'visible';
}

function renderWinMsg() {
    messageContainer.classList.remove('hide');
    messageContainer.innerHTML = `
    <h2>YOU WON!!!</h2>
    <p>Your Score: <span> ${moves} </span></p>
    `
    audio.youWinAudio.play();

    playAgainBtn.style.visibility = 'visible';
}

function renderTime() {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft  % 60;
    seconds < 10 ? seconds = `0${seconds}` : seconds = `${seconds}`;
    document.querySelector('#timer span').innerText = `${minutes}:${seconds}`;

    let timer = document.getElementById('timer');
    timeLeft <= 5 ? timer.style.color = 'red' : timer.style.color = 'grey';

    if(timeLeft === 0) {
        timeOut = true;
        checkGameOver();
    }
}

window.onload = function() {
    renderCards();
}