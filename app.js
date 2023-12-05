document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game__container');
    const ground = document.querySelector('.ground');
    const scoreText = document.querySelector('#score');

    let birdLeft = 220;
    let birdBottom = 200;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;
    let score = 0;

    function startGame(){
        birdBottom -= gravity;
        bird.style.left = birdLeft + 'px';
        bird.style.bottom = birdBottom + 'px';
    }

    let gameTimerId = setInterval(startGame, 15);
    let obstacleIntervals = []; // Store all obstacle interval IDs

    function jumpControlKey(e){
        if (e.keyCode === 32){
            jump();
        }
    }

    function jumpControlClick(e){
            jump();
    }

    function jump(){
        if(birdBottom < 500){
            birdBottom += 50;
        }
        bird.style.bottom = birdBottom + 'px';
        console.log(birdBottom);
    }

    document.addEventListener('keyup', jumpControlKey);
    document.addEventListener('click', jumpControlClick);

    function generateObstacle(){
        let timerId = setInterval(moveObstacle, 15);
        obstacleIntervals.push(timerId); // Push each new interval ID into the array
        if (!isGameOver) setTimeout(generateObstacle, 2500);

        let randomHeight = Math.random() * 100;
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver){
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('top__obstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === 150){
                if (!isGameOver) score++;
                scoreText.textContent = `Score: ${score}`;
            }

            if (obstacleLeft === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) || birdBottom === 0){
                gameOver();
                clearInterval(timerId);
                ground.style.animation = 'none';
                console.log(score);
            }
        }

    }

    generateObstacle();

    function gameOver(){
        clearInterval(gameTimerId);
        obstacleIntervals.forEach(clearInterval); // Clear all obstacle intervals
        isGameOver = true;
        document.removeEventListener('keyup', jumpControlKey);
        document.removeEventListener('click', jumpControlClick);
    }

});