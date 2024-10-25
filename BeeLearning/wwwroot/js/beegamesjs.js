const bee = document.querySelector('.bee');
const pipe = document.querySelector('.pipe');
const startButton = document.querySelector('.botaobee');
const restartButton = document.querySelector('.botaobee');
const gameOver = document.querySelector('.game-over');
const victoryImage = document.querySelector('.victory-image');
const audioStart = new Audio('../audios/audio_theme.mp3');
const audioGameOver = new Audio('../audios/audio_gameover.mp3');

let score = 0;
let phase = 1; // Começa na fase 1 
let jumps = 0; // Contador de pulos
let speed = 5; // Velocidade inicial dos obstáculos
let isJumping = false; // Controle de pulo

// Inicia o jogo
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight') {
        moveBeeRight();
    } else if (event.code === 'ArrowLeft') {
        moveBeeLeft();
    } else if (event.code === 'Space') {
        jump();
    }
});

function startGame() {
    score = 0;
    phase = 1;
    jumps = 0;
    speed = 5;
    document.querySelector(".game").style.display = "block";
    gameOver.style.display = "none";
    victoryImage.style.display = "none";
    startButton.style.display = "none";
    pipe.classList.add('pipe-animation');
    audioStart.play();
    updatePipeSpeed();
    gameLoop();
}

// Função para pular
function jump() {
    if (!isJumping) {
        isJumping = true;
        bee.classList.add('jump');

        setTimeout(() => {
            bee.classList.remove('jump');
            isJumping = false;
            jumps += 1;
            updatePhase(); // Atualiza a fase com base no número de pulos
        }, 600);
    }
}

function restartGame() {
    startGame();
}

function moveBeeRight() {
    let left = parseInt(window.getComputedStyle(bee).getPropertyValue("left"));
    left += 20;
    mario.style.left = left + 'px';
}

function moveBeeLeft() {
    let left = parseInt(window.getComputedStyle(bee).getPropertyValue("left"));
    left -= 20;
    if (left >= 0) {
        mario.style.left = left + 'px';
    }
}

// Atualiza a fase e velocidade de acordo com o número de pulos
function updatePhase() {
    switch (phase) {
        case 1:
            if (jumps >= 4) {
                advancePhase(2, 0, "Fase 2: Bom trabalho! Pule mais 4 vezes!");
            }
            break;
        case 2:
            if (jumps >= 8) {
                advancePhase(3, 0, "Fase 3: Continue assim! Pule mais 5 vezes!");
            }
            break;
        case 3:
            if (jumps >= 13) {
                advancePhase(4, 0, "Fase 4: Quase lá! Pule mais 5 vezes!");
            }
            break;
        case 4:
            if (jumps >= 18) {
                advancePhase(5, 0, "Fase 5: Excelente! Pule mais 5 vezes!");
            }
            break;
        case 5:
            if (jumps >= 23) {
                advancePhase(6, 0, "Fase 6: Impressionante! Pule mais 5 vezes!");
            }
            break;
        case 6:
            if (jumps >= 28) {
                advancePhase(7, 0, "Fase 7: Você está indo muito bem! Pule mais 5 vezes!");
            }
            break;
        case 7:
            if (jumps >= 32) {
                advancePhase(8, 0, "Fase 8: Continue assim! Pule mais 5 vezes!");
            }
            break;
        case 8:
            if (jumps >= 36) {
                advancePhase(9, 0, "Fase 9: Quase lá! Pule mais 5 vezes!");
            }
            break;
        case 9:
            if (jumps >= 41) {
                advancePhase(10, 0, "Fase 10: Última fase! Pule mais 6 vezes!");
            }
            break;
        case 10:
            if (jumps >= 47) {
                endGame(true); // Mostra a vitória na fase 10
            }
            break;
    }
}

// Função para avançar a fase e ajustar velocidade e mensagem
function advancePhase(nextPhase, newSpeed, message) {
    phase = nextPhase;
    speed = newSpeed;
    updatePipeSpeed();
    document.getElementById("score").textContent = `Fase: ${phase} - Pontos: ${score}`;
    document.getElementById("phase-message").textContent = message; // Atualiza a mensagem da fase
}

// Atualiza a velocidade do pipe
function updatePipeSpeed() {
    pipe.style.animationDuration = `${6 / speed}s`;
}

function checkCollision() {
    const beeRect = bee.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    if (
        beeRect.right > pipeRect.left &&
        beeRect.left < pipeRect.right &&
        beeRect.bottom > pipeRect.top &&
        beeRect.top < pipeRect.bottom
    ) {
        endGame(false); // Fim do jogo com derrota
    }
}

function gameLoop() {
    checkCollision();
    requestAnimationFrame(gameLoop);
}

// Função para encerrar o jogo
function endGame(won) {
    pipe.classList.remove('pipe-animation');
    document.querySelector(".game").style.display = "none";

    if (won) {
        victoryImage.style.display = "block";
        document.getElementById("phase-message").textContent = "Você ganhou! Parabéns!";
        audioStart.pause();
        audioGameOver.play(); // Pode ser um áudio de vitória se você tiver
    } else {
        gameOver.style.display = "block";
        document.getElementById("phase-message").textContent = "Game Over! Tente novamente.";
    }
}

// Evento para reiniciar o jogo com a tecla Enter
document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});

// Inicia o loop do jogo
gameLoop();
