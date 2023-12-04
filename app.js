document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.gam__container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;

    function startGame(){
        birdBottom -= gravity;
        bird.style.left = birdLeft + 'px';
        bird.style.bottom = birdBottom + 'px';
    }

    let timerId = setInterval(startGame, 20)

    function jump(){
        if(birdBottom < 500){
            birdBottom += 50;
        }
        bird.style.bottom = birdBottom + '+';
        console.log(birdBottom);
    }

    document.addEventListener('keyup', jump);
});