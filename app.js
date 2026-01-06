const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;

const messageElement = document.getElementById('message');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startGame);

function startGame() {
    level = 0;
    sequence = [];
    playerSequence = [];
    messageElement.textContent = "Level 0";
    nextSequence();
}

function nextSequence() {
    playerSequence = [];
    level++;
    messageElement.textContent = "Level " + level;
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            return;
        }
        const color = sequence[i];
        flashColor(color);
        i++;
    }, 1000);
}

function flashColor(color) {
    const colorBox = document.getElementById(color);
    colorBox.classList.add('active');
    setTimeout(() => {
        colorBox.classList.remove('active');
    }, 500);
}

document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', (event) => {
        const clickedColor = event.target.id;
        playerSequence.push(clickedColor);
        flashColor(clickedColor);
        checkSequence(playerSequence.length - 1);
    });
});

function checkSequence(currentIndex) {
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        messageElement.textContent = "Wrong! Game Over. Click Start to try again.";
        startButton.style.display = 'block';
        return;
    }

    if (playerSequence.length === sequence.length) {
        startButton.style.display = 'none';
        setTimeout(nextSequence, 1000);
    }
}