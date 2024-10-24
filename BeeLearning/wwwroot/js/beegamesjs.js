let score = 0; // Pontuação inicial
let phase = 1; // Fase inicial
let speed = 5; // Velocidade inicial dos obstáculos

function startGame() {
    score = 0; // Reseta pontuação
    phase = 1; // Reseta fase
    speed = 5; // Reseta velocidade
    updateScore();
    updateSpeed(); // Define a velocidade inicial
    document.querySelector(".game-over").style.display = "none"; // Esconde Game Over
    document.querySelector(".game").style.display = "block"; // Mostra a tela do jogo
}

function jump() {
    // Lógica do pulo
    score += 10; // Incrementa 10 pontos a cada pulo
    updateScore(); // Atualiza pontuação na tela
    checkPhase(); // Verifica se mudou de fase
}

function updateScore() {
    document.getElementById("score").textContent = "Pontos: " + score; // Exibe a pontuação
}

function checkPhase() {
    if (score >= 100 * phase) { // Ao atingir múltiplos de 100 pontos, muda de fase
        phase += 1; // Incrementa fase
        increaseSpeed(); // Aumenta a velocidade
        alert("Fase " + phase + " desbloqueada! A velocidade aumentou!");
    }
}

function increaseSpeed() {
    speed -= 0.5; // Aumenta a velocidade diminuindo o intervalo de animação
    if (speed < 2) {
        speed = 2; // Define um limite mínimo de velocidade
    }
    updateSpeed(); // Atualiza a velocidade no CSS
}

function updateSpeed() {
    document.querySelector(".pipe").style.animationDuration = speed + "s"; // Ajusta a velocidade do cano
    document.querySelector(".clouds").style.animationDuration = (speed + 5) + "s"; // Ajusta a velocidade das nuvens
}

function restartGame() {
    score = 0; // Reseta a pontuação
    phase = 1; // Reseta a fase
    speed = 5; // Reseta a velocidade
    updateScore();
    updateSpeed();
    document.querySelector(".game-over").style.display = "none"; // Esconde a tela de Game Over
    document.querySelector(".game").style.display = "block"; // Mostra a tela de jogo
}
