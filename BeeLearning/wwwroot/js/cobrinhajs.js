const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const boxSize = 20; // Tamanho de cada bloco do jogo
canvas.width = 400;
canvas.height = 400;

let snake, direction, food, score;
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");
const difficultyButtons = document.querySelectorAll(".difficulty-selection button");
let game; // variável para o intervalo do jogo
let speed = 100; // Velocidade padrão do jogo

// Função para reiniciar o jogo
function restartGame() {
    snake = [{ x: 9 * boxSize, y: 10 * boxSize }]; // Posição inicial da cobrinha
    direction = ""; // Direção inicial
    food = { x: randomPosition(), y: randomPosition() }; // Posição inicial da comida
    score = 0;
    scoreDisplay.textContent = score;
    restartButton.style.display = "none"; // Esconder o botão de reinício
    clearInterval(game); // Limpar o intervalo existente
    game = setInterval(gameLoop, speed); // Reiniciar o loop do jogo com a velocidade selecionada
}

// Detectar a tecla pressionada
document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

// Função para gerar uma posição aleatória para a comida
function randomPosition() {
    return Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}


// Função para desenhar a cobrinha
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "white"; // Cor branca para a cobrinha
        console.log("Desenhando bloco da cobrinha com cor branca"); // Debug
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }
}






// Função para verificar colisão com as bordas ou com a própria cobrinha
function checkCollision(newHead) {
    // Colisão com bordas
    if (
        newHead.x < 0 ||
        newHead.x >= canvas.width ||
        newHead.y < 0 ||
        newHead.y >= canvas.height
    ) {
        return true;
    }
    // Colisão com a própria cobrinha
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Função principal do jogo
function gameLoop() {
    // Movimentação
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= boxSize;
    if (direction === "UP") snakeY -= boxSize;
    if (direction === "RIGHT") snakeX += boxSize;
    if (direction === "DOWN") snakeY += boxSize;

    const newHead = { x: snakeX, y: snakeY };

    // Verificar se a cobrinha comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = { x: randomPosition(), y: randomPosition() };
    } else {
        snake.pop(); // Remove o último bloco da cobrinha
    }

    // Verificar colisões
    if (checkCollision(newHead)) {
        clearInterval(game); // Fim do jogo
        restartButton.style.display = "block"; // Mostrar botão de reinício
        alert("Game Over! Sua pontuação foi: " + score);
        return;
    }

    snake.unshift(newHead); // Adiciona a nova cabeça da cobrinha

    // Desenhar o jogo
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas
    drawFood();
    drawSnake();
}

// Função para iniciar o jogo com a dificuldade escolhida
function startGame(selectedSpeed) {
    speed = selectedSpeed; // Atualiza a velocidade com a dificuldade escolhida
    document.querySelector(".difficulty-selection").style.display = "none"; // Esconder a seleção de dificuldade
    document.querySelector(".game-container").style.display = "block"; // Mostrar o canvas do jogo
    restartGame(); // Iniciar o jogo
}

// Adiciona os eventos de clique para cada botão de dificuldade
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "easyButton") {
            startGame(200); // Velocidade fácil
        } else if (button.id === "mediumButton") {
            startGame(100); // Velocidade média
        } else if (button.id === "hardButton") {
            startGame(50); // Velocidade difícil
        }
    });
});

// Adiciona evento de clique ao botão de reinício
restartButton.addEventListener("click", restartGame);
