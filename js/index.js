const alfabet = "abcdefghijklmnopqrstuvwxyz";
let livesCounter = 5;
const words = ["java", "html", "javascript", "css", "python"];
let wordToGuess = undefined;
let tries = [];


window.addEventListener("DOMContentLoaded", ()=>{
    // build keyboard 
    buildKeyboard();
    
    newGame();

    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", newGame);
});

function buildKeyboard() {
    const keyboard = document.getElementById("keyboard");
    for(const letter of alfabet){
        const keyButton = buildKey(letter);
        keyButton.addEventListener('click', () => guess(letter));
        keyboard.appendChild(keyButton);
    }
}

function guess(letter) {
    tries.push(letter)
    if (wordToGuess.includes(letter)) {
        updateWord();
        if (isGameWon()) {
            console.log('you win');
        }
    } else {
        setLivesCounter(livesCounter - 1);
        if (livesCounter < 1) {
            console.log('you lose');
        }
    }
}

function isGameWon() {
    for (const letter of wordToGuess) {
        if (!tries.includes(letter)) {
            return false;
        }
    }
    return true;
}

function updateWord() {
    let hiddenWord = document.getElementById ("hiddenWord");
    hiddenWord.innerHTML = "";
    for(const letter of wordToGuess){
        const letterBox = document.createElement("span");
        letterBox.classList.add("letterBox");
        const letterParagraph = document.createElement("p");
        if (!tries.includes(letter)) {
            letterParagraph.classList.add("invisible");
        }
        
        letterParagraph.innerText = letter;
        letterBox.appendChild(letterParagraph);
        hiddenWord.appendChild(letterBox);
    }
}


function setLivesCounter(count) {
    livesCounter = count;
    const livesCounterElement = document.getElementById("livesCounter");
    livesCounterElement.innerText = count;
}

function buildKey(letter){
    const keyButton = document.createElement("button");
    keyButton.innerText = letter;
    keyButton.classList.add("keyboardKey");
    return keyButton;
}

function newGame(){ 
    setLivesCounter(5);
    tries = []
    const wordIndex = getRandomInt(words.length - 1);
    wordToGuess = words[wordIndex];
    console.log(wordToGuess);
    let hiddenWord = document.getElementById ("hiddenWord");
    hiddenWord.innerHTML = "";
    for(const letter of wordToGuess){
        const letterBox = document.createElement("span");
        letterBox.classList.add("letterBox");
        const letterParagraph = document.createElement("p");
        letterParagraph.classList.add("invisible");
        letterParagraph.innerText = letter;
        letterBox.appendChild(letterParagraph);
        hiddenWord.appendChild(letterBox);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}