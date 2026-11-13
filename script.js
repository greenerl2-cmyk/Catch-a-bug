
// Selects elements from the HTML file

const screens = document.querySelectorAll('.screen'); // Selects all three screens

const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn'); // Selects insect buttons

const startBtn = document.getElementById('start-btn'); // Selects play button

const gameContainer = document.getElementById('game-container'); // Selects gameplay area

const timeEl = document.getElementById('time'); // Selects timer

const scoreEl = document.getElementById('score'); // Selects score display

const message = document.getElementById('message'); // Selects warning message


// CUSTOM: Selects newly added HTML elements

const highScoreEl = document.getElementById('high-score'); // Selects high-score display

const restartBtn = document.getElementById('restart-btn'); // Selects restart button


// Variables that store game information

let seconds = 0; // Stores elapsed time

let score = 0; // Stores the player's current score

let selectedInsect = {}; // Stores the selected insect's information


// CUSTOM: Loads the saved high score

let highScore = Number(localStorage.getItem('highScore')) || 0;
// Retrieves the saved score or uses zero if there is no saved score

highScoreEl.innerHTML = `Best: ${highScore}`;
// Displays the saved high score


// Starts the game when Play Game is clicked

startBtn.addEventListener('click', () => {

    screens[0].classList.add('up');
    // Moves the first screen upward to reveal insect selection

});


// Allows the player to choose an insect

chooseInsectBtns.forEach(btn => {

    // Loops through every insect selection button

    btn.addEventListener('click', () => {

        const img = btn.querySelector('img');
        // Finds the image inside the selected button

        const src = img.getAttribute('src');
        // Gets the insect's image URL

        const alt = img.getAttribute('alt');
        // Gets the insect's alternative text

        selectedInsect = { src, alt };
        // Stores the selected insect's information

        screens[1].classList.add('up');
        // Moves to the gameplay screen

        setTimeout(createInsect, 1000);
        // Creates the first insect after one second

        startGame();
        // Starts the game timer

    });

});


// Starts the timer

function startGame() {

    setInterval(increaseTime, 1000);
    // Runs increaseTime every 1000 milliseconds (one second)

}


// Updates the timer

function increaseTime() {

    seconds++; // Adds one second

    let m = Math.floor(seconds / 60);
    // Converts total seconds into minutes

    let s = seconds % 60;
    // Calculates the remaining seconds

    m = m < 10 ? `0${m}` : m;
    // Adds a leading zero to minutes when needed

    s = s < 10 ? `0${s}` : s;
    // Adds a leading zero to seconds when needed

    timeEl.innerHTML = `Time: ${m}:${s}`;
    // Updates the displayed timer

}


// Creates a new insect

function createInsect() {

    const insect = document.createElement('div');
    // Creates a new HTML div element

    insect.classList.add('insect');
    // Gives the element the insect CSS class

    const { x, y } = getRandomLocation();
    // Gets random coordinates for the insect

    insect.style.top = `${y}px`;
    // Sets the insect's vertical position

    insect.style.left = `${x}px`;
    // Sets the insect's horizontal position

    insect.innerHTML = `
        <img src="${selectedInsect.src}"
        alt="${selectedInsect.alt}"
        style="transform: rotate(${Math.random() * 360}deg)">
    `;
    // Adds the selected insect image with a random rotation

    insect.addEventListener('click', catchInsect);
    // Runs catchInsect whenever the insect is clicked

    gameContainer.appendChild(insect);
    // Adds the insect to the gameplay screen

}


// Generates random insect positions

function getRandomLocation() {

    const width = window.innerWidth;
    // Gets the browser window width

    const height = window.innerHeight;
    // Gets the browser window height

    const x = Math.random() * Math.max(0, width - 200) + 100;
    // Generates a random horizontal position

    const y = Math.random() * Math.max(0, height - 300) + 150;
    // CUSTOM: Adds extra space near the top and bottom

    return { x, y };
    // Returns both coordinates to createInsect

}


// Runs whenever an insect is clicked

function catchInsect() {

    // CUSTOM: Prevents scoring the same insect twice

    if (this.classList.contains('caught')) {
        return; // Stops the function if the insect was already caught
    }

    increaseScore();
    // Adds one point to the player's score

    this.classList.add('caught');
    // Activates the shrinking animation

    setTimeout(() => this.remove(), 2000);
    // Removes the caught insect after two seconds

    addInsects();
    // Creates additional insects

}


// Creates two more insects after every successful catch

function addInsects() {

    setTimeout(createInsect, 1000);
    // Creates one insect after one second

    setTimeout(createInsect, 1500);
    // Creates another insect after 1.5 seconds

}


// Updates the player's score

function increaseScore() {

    score++; // Increases the score by one

    if (score > 19) {

        message.classList.add('visible');
        // Displays the warning message at 20 points

    }

    scoreEl.innerHTML = `Score: ${score}`;
    // Updates the displayed score


    // CUSTOM: High-score functionality

    if (score > highScore) {
        // Checks whether the current score beats the best score

        highScore = score;
        // Replaces the previous high score

        highScoreEl.innerHTML = `Best: ${highScore}`;
        // Updates the high-score display

        localStorage.setItem('highScore', highScore);
        // Saves the high score in the browser

    }

}


// CUSTOM: Restart button functionality

restartBtn.addEventListener('click', () => {

    location.reload();
    // Reloads the page and restarts the game
    // The high score remains saved in localStorage

});
