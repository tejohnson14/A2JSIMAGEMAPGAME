// 
// File: whack-a-mole.js
// Author: Tyler Johnson
// Description: Whack-a-Mole Game script
//

document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.getElementById('score');
    const timeLeftBoard = document.getElementById('time-left');
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        return holes[idx];
    }

    function peep() {
        const time = Math.random() * 2000 + 200;
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (timeLeft > 0) {
                peep();
            }
        }, time);
    }

    function startGame() {
        score = 0;
        scoreBoard.textContent = score;
        timeLeft = 30;
        timeLeftBoard.textContent = timeLeft;
        peep();
        gameInterval = setInterval(() => {
            timeLeft--;
            timeLeftBoard.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                clearInterval(timerInterval);
                setTimeout(() => {
                    alert(`Time's up! Your final score is: ${score}`);
                    window.location.href = `score.html?score=${score}`;
                }, 100);
            }
        }, 1000);
    }

    holes.forEach(hole => hole.addEventListener('click', () => {
        if (hole.classList.contains('up')) {
            score++;
            scoreBoard.textContent = score;
            hole.classList.remove('up');
        }
    }));

    startGame();
});
