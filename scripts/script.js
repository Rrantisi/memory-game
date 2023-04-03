/*----- constants -----*/
const valuesRef = ['🦘', '🦎', '🦁', '🦌', '🐹', '🦤', '🐌', '🦈', '🦉', '🐕',
                    '🐯', '🦄', '🐩', '🐻', '🦙', '🐳', '🦖', '🦝', '🐎', '🦒']

/*----- state variables -----*/
let seconds;
let lives;
let moves;
let winner;
let firstCard, secondCard;
let firstCardVal, secondCardVal;
let cardFrontArray = [];

/*----- cached elements -----*/
const playAgainBtn = document.getElementById('play-again');
const startGameBtn = document.getElementById('start');
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
    playGame();
}

function playGame(){
    cards = document.querySelectorAll('.card');
    [...cards].forEach(card => card.addEventListener(('click'), () => {
        if (!firstCard){
            firstCard = card
            firstCardVal = firstCard.getAttribute('value');
            card.style['transform'] = 'rotateY(180deg)';
        } else {
            secondCard = card;
            secondCardVal = secondCard.getAttribute('value');
            card.style['transform'] = 'rotateY(180deg)';
        }
        if(!firstCard || !secondCard) return;
        if(firstCardVal === secondCardVal){
            console.log('matched')
            firstCard = '';
            secondCard = '';
            moves++;
            updateStats();
        }else{
            console.log('try again');
            let [card1, card2] = [firstCard, secondCard]
            setTimeout(() => {
                card1.style['transform'] = 'rotateY(0deg)';
                card2.style['transform'] = 'rotateY(0deg)';        
            }, 1000);  
            lives--;
            moves++;
            updateStats();
            firstCard = '';
            secondCard = '';
        }
    }))
}

function updateStats(){
    document.getElementById('score').innerText = `Your Score: ${moves}`;
    document.getElementById('lives').innerText = `Lives: ${lives}`
}





initialize()
function initialize(){
    seconds = 0;
    lives = 10;
    moves = 0;
    winner = false;
    firstCardVal = '';
    secondCardVal = '';
    cardFrontArray.splice(0);
    playAgainBtn.style.visibility = 'hidden';
    render()
}

function render(){
}

window.onload = function(){
    renderCards();
}


