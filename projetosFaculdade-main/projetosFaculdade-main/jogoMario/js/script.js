
document.addEventListener('DOMContentLoaded', () => {
    const mario = document.querySelector('.mario');
    const pipe = document.querySelector('.pipe');
    const scoreElement = document.querySelector('.score');
    const startScreen = document.getElementById('startScreen');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const finalScoreText = document.getElementById('finalScoreText');

    let score = 0;
    let gameLoop = null;
    let isGameOver = false;
    let isPlaying = false;

    const setScore = (value) => {
        score = value;
        scoreElement.textContent = score;
    };

    const resetGame = () => {
        setScore(0);
        isGameOver = false;
        isPlaying = true;

        mario.src = './images/mario.gif';
        mario.style.width = '150px';
        mario.style.marginLeft = '0';
        mario.style.left = '50px';
        mario.style.animation = '';
        mario.classList.remove('jump');

        pipe.style.animation = 'none';
        pipe.style.left = '';
        pipe.style.right = '-80px';
        void pipe.offsetWidth;
        pipe.style.animation = 'pipe-animation 2s infinite linear';

        finalScoreText.textContent = `Sua pontuação: ${score}`;
    };

    const endGame = () => {
        isGameOver = true;
        isPlaying = false;
        clearInterval(gameLoop);

        pipe.style.animation = 'none';
        mario.style.animation = 'none';

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        finalScoreText.textContent = `Sua pontuação: ${score}`;
        gameOverScreen.style.display = 'flex';
    };

    const startGame = () => {
        resetGame();

        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';

        if (gameLoop) clearInterval(gameLoop);

        gameLoop = setInterval(() => {
            if (!isPlaying) return;

            setScore(score + 1);

            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
                endGame();
            }
        }, 50);
    };

    const jump = () => {
        if (!isPlaying || isGameOver || mario.classList.contains('jump')) return;
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 1000);
    };

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    document.addEventListener('keydown', jump);

    startScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
    setScore(0);
});
