const selectors = {
    questionContainer: document.querySelector('.question-container'),
    question: document.querySelector('.question'),
    answerInput: document.querySelector('.answer'),
    submitButton: document.querySelector('.submit-answer'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    startButton: document.getElementById('start-button'),
    win: document.querySelector('.win'),
    questionCount: document.getElementById('question-count'),
    difficulty: document.getElementById('difficulty'),
    remainingQuestions: document.querySelector('.remaining-questions'),
    correctCount: document.querySelector('.correct-count') // Novo seletor para acertos
};

const state = {
    gameStarted: false,
    totalFlips: 0,
    totalTime: 0,
    totalPairs: 0,
    currentQuestionIndex: 0,
    questions: [],
    correctAnswers: 0, // Contador de acertos
    loop: null
};

// Questões matemáticas
const easyQuestions = [
    { problem: "2 + 3", answer: 5 },
    { problem: "5 - 2", answer: 3 },
    { problem: "4 + 6", answer: 10 },
    { problem: "8 - 3", answer: 5 },
    { problem: "6 + 2", answer: 8 },
    { problem: "9 - 4", answer: 5 },
    { problem: "7 + 1", answer: 8 },
    { problem: "3 + 2", answer: 5 },
    { problem: "10 - 6", answer: 4 },
    { problem: "5 + 5", answer: 10 }
];

const mediumQuestions = [
    { problem: "12 + 8", answer: 20 },
    { problem: "15 - 7", answer: 8 },
    { problem: "9 * 2", answer: 18 },
    { problem: "16 / 4", answer: 4 },
    { problem: "14 - 5", answer: 9 },
    { problem: "6 * 3", answer: 18 },
    { problem: "24 / 3", answer: 8 },
    { problem: "18 - 9", answer: 9 },
    { problem: "10 + 11", answer: 21 },
    { problem: "20 / 5", answer: 4 }
];

const hardQuestions = [
    { problem: "25 + 36", answer: 61 },
    { problem: "48 - 19", answer: 29 },
    { problem: "12 * 11", answer: 132 },
    { problem: "81 / 9", answer: 9 },
    { problem: "63 - 27", answer: 36 },
    { problem: "18 * 6", answer: 108 },
    { problem: "144 / 12", answer: 12 },
    { problem: "50 + 50", answer: 100 },
    { problem: "72 - 36", answer: 36 },
    { problem: "15 * 4", answer: 60 }
];

// Gera questões aleatórias com base na dificuldade e na quantidade escolhida
const generateQuestions = (count, difficulty) => {
    let selectedQuestions = [];
    if (difficulty === 'easy') {
        selectedQuestions = easyQuestions;
    } else if (difficulty === 'medium') {
        selectedQuestions = mediumQuestions;
    } else if (difficulty === 'hard') {
        selectedQuestions = hardQuestions;
    }

    // Embaralha as perguntas
    selectedQuestions = shuffle(selectedQuestions);
    return selectedQuestions.slice(0, count); // Retorna apenas o número de perguntas selecionadas
}

// Função para embaralhar um array
const shuffle = array => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];
        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }
    return clonedArray;
}

const startGame = () => {
    state.gameStarted = true;
    selectors.startButton.classList.add('disabled');

    // Exibe a seção de perguntas
    selectors.questionContainer.style.display = 'block';

    const count = parseInt(selectors.questionCount.value);
    const difficulty = selectors.difficulty.value;
    state.questions = generateQuestions(count, difficulty);
    state.totalPairs = state.questions.length;

    // Atualiza o número de perguntas restantes
    selectors.remainingQuestions.innerText = `Perguntas restantes: ${state.totalPairs}`;
    selectors.correctCount.innerText = `Acertos: ${state.correctAnswers}`; // Reseta acertos

    // Exibe a primeira pergunta
    showQuestion();

    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.moves.innerText = `${state.totalFlips} Movimentos`;
        selectors.timer.innerText = `Tempo: ${state.totalTime} Seg`;
    }, 1000);
}

const showQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length) {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        selectors.question.innerText = currentQuestion.problem;
        selectors.answerInput.value = '';
    } else {
        endGame();
    }
}

const submitAnswer = () => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const userAnswer = parseInt(selectors.answerInput.value);

    if (userAnswer === currentQuestion.answer) {
        state.correctAnswers++; // Incrementa acertos
        selectors.correctCount.innerText = `Acertos: ${state.correctAnswers}`; // Atualiza acertos
    } else {
        // Feedback visual de erro
        selectors.answerInput.classList.add('error');
        alert('Resposta errada! Avançando para a próxima questão.');

        // Penalidade: aumentar movimentos e tempo
        state.totalFlips++; // Penaliza com mais um movimento
        state.totalTime += 5; // Adiciona 5 segundos de penalidade ao tempo

        // Remove a classe de erro após 1 segundo
        setTimeout(() => {
            selectors.answerInput.classList.remove('error');
        }, 1000);
    }

    // Avança para a próxima pergunta, independente de acerto ou erro
    state.totalFlips++; // Sempre conta como um movimento
    selectors.remainingQuestions.innerText = `Perguntas restantes: ${--state.totalPairs}`;
    state.currentQuestionIndex++;

    // Atualiza os valores de tempo e movimentos totais
    selectors.moves.innerText = `${state.totalFlips} Movimentos`;
    selectors.timer.innerText = `Tempo: ${state.totalTime} Seg`;

    // Verifica se ainda há perguntas
    if (state.currentQuestionIndex < state.questions.length) {
        showQuestion(); // Mostra a próxima pergunta
    } else {
        endGame(); // Se acabou as perguntas, termina o jogo
    }
}

const endGame = () => {
    clearInterval(state.loop);
    selectors.win.innerHTML = `
        <span class="win-text">
            Você terminou o jogo!<br />
            Acertos: <span class="highlight">${state.correctAnswers}</span><br />
            Movimentos: <span class="highlight">${state.totalFlips}</span><br />
            Tempo: <span class="highlight">${state.totalTime}</span> segundos
        </span>
    `;
}

const attachEventListeners = () => {
    selectors.submitButton.addEventListener('click', submitAnswer);
    selectors.startButton.addEventListener('click', startGame);
}

attachEventListeners();
