const artigosPorMateria = {
    historia: [
        "A Revolução Francesa: Um Marco na História.",
        "As Grandes Navegações e o Descobrimento do Brasil."
    ],
    matematica: [
        "A História da Matemática: Dos Números Naturais à Era Digital.",
        "Geometria: Aplicações e Teorias ao Longo dos Séculos."
    ],
    geografia: [
        "Mudanças Climáticas: Causas e Consequências.",
        "O Papel da Geografia na Política Global."
    ],
    ciencias: [
        "A Evolução das Espécies: Teoria e Evidências.",
        "A Química do Cotidiano: Como os Elementos nos Afetam."
    ]
};





//    {/*Barra de Pesquisa*/}

//function filterMovies() {
//        const input = document.getElementById('searchInput').value.toLowerCase(); // Obtém o valor da barra de pesquisa e transforma em minúsculas
//const cards = document.querySelectorAll('.cardflix'); // Seleciona todas as cartas

//        cards.forEach(card => {
//            const title = card.querySelector('.card-title').textContent.toLowerCase(); // Obtém o texto do título da carta
//if (title.includes(input)) {
//    card.style.display = 'inline-block'; // Exibe a carta se o título contém o termo de pesquisa
//            } else {
//    card.style.display = 'none'; // Oculta a carta se o título não contém o termo de pesquisa
//            }
//        });
//    }







{/* Barra de Pesquisa */ }
function filterMovies() {
    // Mostra o spinner de carregamento
    document.getElementById('loadingSpinner').style.display = 'inline-block';

    // Simula o carregamento de 2 segundos
    setTimeout(function () {
        // Oculta o spinner após 2 segundos
        document.getElementById('loadingSpinner').style.display = 'none';

        // Obtém o valor da barra de pesquisa e transforma em minúsculas
        const input = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.cardflix'); // Seleciona todas as cartas

        // Itera sobre as cartas e aplica o filtro
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase(); // Obtém o texto do título da carta
            if (title.includes(input)) {
                card.style.display = 'inline-block'; // Exibe a carta se o título contém o termo de pesquisa
            } else {
                card.style.display = 'none'; // Oculta a carta se o título não contém o termo de pesquisa
            }
        });
    }, 1000); // 1 segundos de simulação de carregamento
}








/*  VALIDAÇÃO DA REDAÇÃO*/


// Função para verificar se a redação contém palavras-chave
function contemPalavrasChave(texto, palavrasChave) {
    return palavrasChave.some(palavra => texto.includes(palavra));
}

// Função que avalia a redação
function avaliarRedacao() {
    const tema = document.getElementById("tema").value;
    const redacao = document.getElementById("redacao").value.trim();
    const erroTemaDiv = document.getElementById("erroTema");
    const temaStatusDiv = document.getElementById("temaStatus");
    const resultadoDiv = document.getElementById("resultado");
    const feedbackDiv = document.getElementById("feedback");

    let pontuacao = 1000; // Pontuação máxima
    let feedback = "";

    // Limpar mensagens anteriores
    erroTemaDiv.textContent = "";
    temaStatusDiv.textContent = "";
    resultadoDiv.textContent = "";
    feedbackDiv.textContent = "";

    // Validação do tema
    if (!tema || tema === "Escolha o Tema") {
        temaStatusDiv.textContent = "Por favor, escolha um tema antes de submeter a redação.";
        return;
    } else {
        temaStatusDiv.textContent = "Tema selecionado com sucesso.";
    }

    // Validação da estrutura da redação
    if (redacao.length === 0) {
        feedback = "Por favor, escreva uma redação.";
        pontuacao = 0;
    } else {
        // Análise da introdução
        const introducao = redacao.split("\n")[0]; // Considera a primeira linha como introdução
        if (introducao.length < 20) {
            feedback += "Introdução muito curta. ";
            pontuacao -= 100;
        }

        // Análise da coesão - conectivos e repetição excessiva
        const palavrasComuns = ['e', 'a', 'o', 'de', 'que', 'do'];
        const palavrasRedacao = redacao.split(/\s+/);
        const palavrasUnicas = [...new Set(palavrasRedacao)];
        if (palavrasUnicas.length / palavrasRedacao.length < 0.5 || !contemPalavrasChave(redacao, ['portanto', 'consequentemente', 'assim'])) {
            feedback += "Coesão insuficiente. ";
            pontuacao -= 100;
        }

        // Validação da tese - busca por termos que expressem opinião ou uma posição
        const palavrasTese = ['portanto', 'é necessário', 'deve-se', 'é essencial', 'é importante'];
        if (!contemPalavrasChave(redacao, palavrasTese)) {
            feedback += "Tese não clara ou ausente. ";
            pontuacao -= 200;
        }

        // Validação do repertório sociocultural - busca por referências culturais ou históricas
        const palavrasRepertorio = ['história', 'cultura', 'política', 'governo', 'sociedade', 'ciência', 'economia'];
        if (!contemPalavrasChave(redacao, palavrasRepertorio)) {
            feedback += "Repertório sociocultural inadequado. ";
            pontuacao -= 200;
        }

        // Validação da argumentação - busca por conectivos lógicos
        const palavrasArgumentacao = ['porque', 'portanto', 'assim', 'logo', 'então', 'por conseguinte', 'assim sendo', 'em virtude disso',
            'consequentemente', 'dessa forma', 'ou seja',
            'em síntese', 'diante disso', 'por isso',
            'por outro lado', 'de acordo com', 'ademais',
            'além disso', 'de fato', 'entretanto',
            'apesar disso', 'no entanto', 'considerando que',
            'é importante ressaltar que', 'devemos considerar que',
            'outro ponto relevante é que', 'a partir disso, podemos concluir que',
            'um exemplo que ilustra essa situação é',
            'cabe destacar que'];
        if (!contemPalavrasChave(redacao, palavrasArgumentacao)) {
            feedback += "Argumentação fraca ou ausente. ";
            pontuacao -= 200;
        }

        // Validação da conclusão - busca por termos que indiquem encerramento ou solução
        const palavrasConclusao = ['em conclusão', 'portanto', 'conclui-se que', 'assim', 'em resumo',
            'para finalizar', 'por fim', 'em suma', 'dessa forma', 'por isso', 'de modo geral',
            'cabe ressaltar que', 'para encerrar', 'em face do exposto',
            'em síntese', 'de acordo com o que foi discutido',
            'assim sendo', 'para concluir', 'por conseguinte',
            'com isso', 'diante do exposto'];
        if (!contemPalavrasChave(redacao, palavrasConclusao)) {
            feedback += "Conclusão ausente ou mal elaborada. ";
            pontuacao -= 200;
        }

        // Ajustar pontuação mínima
        if (pontuacao < 0) pontuacao = 0;
    }

    // Se não houver feedback negativo, considera a redação excelente
    if (feedback.length === 0) {
        feedback = "Sua redação está excelente, parabéns!";
        pontuacao = 1000; // A pontuação é 1000
    }

    // Exibir resultados
    resultadoDiv.textContent = `Nota: ${pontuacao}`;
    feedbackDiv.textContent = feedback;
}

// Adicionar evento ao botão de avaliação
document.getElementById("avaliarBtn").addEventListener("click", avaliarRedacao);

// Função para mostrar o campo de entrada "Outros"
function showInputPanel() {
    const selectElement = document.getElementById("tema");
    const inputPanel = document.getElementById("inputPanel");
    const otherInput = document.getElementById("otherInput");

    // Verifica se a opção "Outros" foi selecionada
    if (selectElement.value === "other") {
        inputPanel.style.display = "block"; // Mostra o campo de entrada
        otherInput.focus(); // Foca no campo de entrada
    } else {
        inputPanel.style.display = "none"; // Esconde o campo de entrada
        otherInput.value = ""; // Limpa o campo de entrada
        document.getElementById("savedMessage").style.display = "none"; // Esconde a mensagem de salvo
    }
}

function saveInput() {
    const otherInput = document.getElementById("otherInput").value;
    const savedMessage = document.getElementById("savedMessage");
    savedMessage.innerText = "Tema salvo: " + otherInput;
    savedMessage.style.display = "block"; // Mostra a mensagem de salvo
}

/*******************************************************************************/





























/*******************************************************************************/
/**********************************QUIZES*********************************************/
/*******************************************************************************/
/*PERGUNTAS E RESPOSTAS*/




const questions = [
    {
        question: "Assinale a alternativa em que o uso da crase está correto:",
        answers: [
            { text: "Fui à escola ontem.", correct: false },
            { text: "Entreguei o livro a professora.", correct: false },
            { text: "O evento será à noite.", correct: true },
            { text: "Referi-me a situação.", correct: false }
        ]
    },
    {
        question: "Assinale a opção em que a palavra está escrita corretamente:",
        answers: [
            { text: "Exceção", correct: true },
            { text: "Ascenção", correct: false },
            { text: "Compreenção", correct: false },
            { text: "Recolher", correct: false }
        ]
    },
    {
        question: "Qual dos seguintes textos pode ser considerado um gênero narrativo?",
        answers: [
            { text: "Artigo de opinião", correct: true },
            { text: "Poema", correct: false },
            { text: "Notícia", correct: false },
            { text: "Crônica", correct: false }
        ]
    },
    {
        question: "Qual das opções a seguir é um exemplo de metáfora?",
        answers: [
            { text: "Ele correu mais rápido que o vento.", correct: false },
            { text: "Ela é bonita como uma flor.", correct: false },
            { text: "Ele é um leão no trabalho.", correct: true },
            { text: "O sol nasceu.", correct: false }
        ]
    },
    {
        question: "Em uma narrativa, os personagens, o espaço e o tempo são elementos que compõem:",
        answers: [
            { text: "O tema", correct: false },
            { text: "A estrutura", correct: true },
            { text: "O conflito", correct: false },
            { text: "O clímax", correct: false }
        ]
    },
    {
        question: "A palavra 'mas' pode ser classificada como:",
        answers: [
            { text: "Advérbio", correct: false },
            { text: "Conjunção subordinativa", correct: false },
            { text: "Preposição", correct: false },
            { text: "Conjunção coordenativa", correct: true }
        ]
    },
    {
        question: "Qual dos seguintes movimentos artísticos é conhecido por sua ênfase na luz e na cor, utilizando pinceladas soltas?",
        answers: [
            { text: "Romantismo", correct: false },
            { text: "Surrealismo", correct: false },
            { text: "Impressionismo", correct: true },
            { text: "Expressionismo", correct: false }
        ]
    },
    {
        question: "Quem é o autor da famosa obra 'A Noite Estrelada'?",
        answers: [
            { text: "Claude Monet", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Salvador Dalí", correct: false },
            { text: "Vincent van Gogh", correct: true }
        ]
    },
    {
        question: "O que caracteriza a arquitetura gótica?",
        answers: [
            { text: "Uso de colunas clássicas e simetria", correct: false },
            { text: "Arcos ogivais e vitrais coloridos", correct: true },
            { text: "Uso de concreto e aço", correct: false },
            { text: "Linhas retas e simplicidade", correct: false }
        ]
    },
    {
        question: "Which modal verb expresses ability?",
        answers: [
            { text: "Should", correct: false },
            { text: "Must", correct: false },
            { text: "Can", correct: true },
            { text: "Could", correct: false }
        ]
    },
    {
        question: "Which sentence is in the present continuous tense?",
        answers: [
            { text: "I eat breakfast at 8 AM.", correct: false },
            { text: "They played soccer yesterday.", correct: false },
            { text: "He will go to the party.", correct: false },
            { text: "She is studying for her exams.", correct: true }
        ]
    },
    {
        question: "Which preposition fits best in the sentence: 'The cat is sitting ___ the table'?",
        answers: [
            { text: "At", correct: false },
            { text: "In", correct: false },
            { text: "On", correct: true },
            { text: "With", correct: false }
        ]
    },
    {
        question: "Qual estilo de dança é associado a um movimento fluido e expressivo, muitas vezes realizado em palcos de teatro?",
        answers: [
            { text: "Jazz", correct: false },
            { text: "Hip-hop", correct: false },
            { text: "Ballet", correct: true },
            { text: "Salsa", correct: false }
        ]
    },
    {
        question: "Qual técnica artística envolve a aplicação de tinta em uma superfície utilizando um spray ou aerógrafo?",
        answers: [
            { text: "Acrílico", correct: false },
            { text: "Grafite", correct: false },
            { text: "Aquarela", correct: false },
            { text: "Spray Art", correct: true }
        ]
    },
    {
        question: "Qual filme da Disney, lançado em 1994, é conhecido por suas canções icônicas e se passa na savana africana?",
        answers: [
            { text: "Aladdin", correct: false },
            { text: "A Bela e a Fera", correct: false },
            { text: "O Rei Leão", correct: true },
            { text: "Pocahontas", correct: false }
        ]
    },
    {
        question: "Qual das seguintes modalidades é considerada um esporte de combate?",
        answers: [
            { text: "Futebol", correct: false },
            { text: "Ciclismo", correct: false },
            { text: "Vôlei", correct: false },
            { text: "Judô", correct: true }
        ]
    },
    {
        question: "Qual é a origem dos Jogos Olímpicos?",
        answers: [
            { text: "Grécia", correct: true },
            { text: "Roma", correct: false },
            { text: "Egito", correct: false },
            { text: "China", correct: false }
        ]
    },
    {
        question: "Qual macronutriente é considerado a principal fonte de energia para atletas durante a atividade física?",
        answers: [
            { text: "Carboidratos", correct: true },
            { text: "Proteínas", correct: false },
            { text: "Vitaminas", correct: false },
            { text: "Gorduras", correct: false }
        ]
    },
    {
        question: "Qual é a principal função do aquecimento antes de uma atividade física?",
        answers: [
            { text: "Aumentar a força muscular", correct: false },
            { text: "Melhorar a flexibilidade", correct: false },
            { text: "Reduzir o risco de lesões", correct: true },
            { text: "Aumentar a resistência cardiovascular", correct: false }
        ]
    },
    {
        question: "Qual das seguintes características é típica do Romantismo?",
        answers: [
            { text: "Valorização da razão e da lógica", correct: false },
            { text: "Idealização do amor e da natureza", correct: true },
            { text: "Busca pela simplicidade e clareza", correct: false },
            { text: "Uso de linguagem técnica e científica", correct: false }
        ]
    },
    {
        question: "Quem é o autor de 'Dom Casmurro'?",
        answers: [
            { text: "José de Alencar", correct: false },
            { text: "Graciliano Ramos", correct: false },
            { text: "Clarice Lispector", correct: false },
            { text: "Machado de Assis", correct: true }
        ]
    },
    {
        question: "¿Cuál es el opuesto de 'caliente'?",
        answers: [
            { text: "Fresco", correct: false },
            { text: "Gélido", correct: false },
            { text: "Frío", correct: true },
            { text: "Helado", correct: false }
        ]
    },
    {
        question: "¿Cuál es el propósito de la conjunción 'y' en una oración?",
        answers: [
            { text: "Contrastar ideas", correct: false },
            { text: "Dar un ejemplo", correct: false },
            { text: "Indicar tiempo", correct: false },
            { text: "Añadir información", correct: true }
        ]
    },
    {
        question: "¿Qué significa la expresión 'romper el hielo'?",
        answers: [
            { text: "Empezar una pelea", correct: false },
            { text: "Iniciar una conversación", correct: true },
            { text: "Destruir algo", correct: false },
            { text: "Resolver un problema", correct: false }
        ]
    },
    {
        question: "Which modal verb expresses ability?",
        answers: [
            { text: "Should", correct: false },
            { text: "Must", correct: false },
            { text: "Can", correct: true },
            { text: "Could", correct: false }
        ]
    },
    {
        question: "Which sentence is in the present continuous tense?",
        answers: [
            { text: "I eat breakfast at 8 AM.", correct: false },
            { text: "They played soccer yesterday.", correct: false },
            { text: "He will go to the party.", correct: false },
            { text: "She is studying for her exams.", correct: true }
        ]
    },
    {
        question: "Which preposition fits best in the sentence: 'The cat is sitting ___ the table'?",
        answers: [
            { text: "At", correct: false },
            { text: "In", correct: false },
            { text: "On", correct: true },
            { text: "With", correct: false }
        ]
    },
    {
        question: "Qual foi a principal consequência da Proclamação da Independência do Brasil em 1822?",
        answers: [
            { text: "O fim da escravidão", correct: false },
            { text: "A separação entre Brasil e Portugal", correct: true },
            { text: "A declaração de república", correct: false },
            { text: "A criação da primeira Constituição", correct: false }
        ]
    },
    {
        question: "Qual das regiões do Brasil é a mais afetada pelo desmatamento, especialmente devido à expansão agrícola e pecuária?",
        answers: [
            { text: "Pantanal", correct: false },
            { text: "Amazônia", correct: true },
            { text: "Mata Atlântica", correct: false },
            { text: "Cerrado", correct: false }
        ]
    },

    {
        question: "Qual continente é o mais populoso do mundo, abrigando mais de 60% da população mundial?",
        answers: [
            { text: "América", correct: false },
            { text: "África", correct: false },
            { text: "Europa", correct: false },
            { text: "Ásia", correct: true }
        ]
    },
    {
        question: "Qual das seguintes formas de relevo é predominante na região Norte do Brasil?",
        answers: [
            { text: "Chapada diamantina", correct: false },
            { text: "Planalto central", correct: false },
            { text: "Planície amazônica", correct: true },
            { text: "Chapada diamantina", correct: false }
        ]
    },
    {
        question: "Qual dos instrumentos abaixo é utilizado para medir a altitude de um ponto em relação ao nível do mar?",
        answers: [
            { text: "Bússola", correct: false },
            { text: "Altímetro", correct: true },
            { text: "Higrômetro", correct: false },
            { text: "Barômetro", correct: false }
        ]
    },
    {
        question: "Qual cultura agrícola é responsável por grande parte das exportações brasileiras, principalmente para a China?",
        answers: [
            { text: "Trigo", correct: false },
            { text: "Algodão", correct: false },
            { text: "Milho", correct: false },
            { text: "Soja", correct: true }
        ]
    },
    {
        question: "Qual é o maior país do mundo em área territorial?",
        answers: [
            { text: "Rússia", correct: true },
            { text: "China", correct: false },
            { text: "Índia", correct: false },
            { text: "Estados Unidos", correct: false }
        ]
    },
    {
        question: "Segundo Platão, o que é o 'mundo das ideias'? ",
        answers: [
            { text: "Um conceito metafórico da alma", correct: false },
            { text: "O resultado de observações científicas", correct: false },
            { text: "O lugar onde as formas perfeitas existem", correct: true },
            { text: "A experiência sensorial humana", correct: false }
        ]
    },
    {
        question: "Qual filósofo afirmou 'Penso, logo existo'?",
        answers: [
            { text: "René Descartes", correct: true },
            { text: "Immanuel Kant", correct: false },
            { text: "David Hume", correct: false },
            { text: "Friedrich Nietzsche", correct: false }
        ]
    },
    {
        question: "O que caracteriza uma 'sociedade pós- industrial'? ",
        answers: [
            { text: "Predomínio do setor de serviços sobre a indústria", correct: true },
            { text: "Dependência de tecnologia rudimentar", correct: false },
            { text: "Economia baseada na agricultura", correct: false },
            { text: "Comércio internacional limitado", correct: false }
        ]
    },
    {
        question: "Qual sociólogo é conhecido pela teoria da 'luta de classes'?",
        answers: [
            { text: "Max Weber", correct: false },
            { text: "Auguste Comte", correct: false },
            { text: "Karl Marx", correct: true },
            { text: "Talcott Parsons", correct: false }
        ]
    },
    {
        question: "O que é o conceito de 'anomia' em Sociologia? ",
        answers: [
            { text: "Conformidade com as regras", correct: false },
            { text: "Falta de normas sociais", correct: true },
            { text: "Respeito às autoridades", correct: false },
            { text: "Processo de socialização", correct: false }
        ]
    },
    {
        question: "Quem é considerado o pai da filosofia ocidental?",
        answers: [
            { text: "Sócrates", correct: true },
            { text: "Aristóteles", correct: false },
            { text: "Platão", correct: false },
            { text: "Kant", correct: false }
        ]
    },
    {
        question: "O que é mobilidade social?",
        answers: [
            { text: "Mudança de residência de um indivíduo", correct: false },
            { text: "Aumento da população em uma área urbana", correct: false },
            { text: "Mudança de classe social de um indivíduo ou grupo", correct: true },
            { text: "Crescimento econômico de uma nação", correct: false }
        ]
    },
    {
        question: "Qual é o rio mais extenso do mundo?",
        answers: [
            { text: "Tigre", correct: false },
            { text: "Nilo", correct: true },
            { text: "Amazonas", correct: false },
            { text: "Mississippi", correct: false }
        ]
    },
    {
        question: "O que é cultura?",
        answers: [
            { text: "O conjunto de bens materiais de uma sociedade", correct: false },
            { text: "A herança genética de um grupo social", correct: false },
            { text: "O sistema econômico de um país", correct: false },
            { text: "O conjunto de hábitos, costumes e valores de um grupo", correct: true }
        ]
    },
    {
        question: "Qual foi o principal objetivo da Revolução Francesa (1789)?",
        answers: [
            { text: "Expandir o império colonial", correct: false },
            { text: "Estabelecer uma monarquia absoluta", correct: false },
            { text: "Derrubar a monarquia e estabelecer uma república", correct: true },
            { text: "Promover a industrialização", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica do clima tropical?",
        answers: [
            { text: "Predomínio de neve e gelo", correct: false },
            { text: "Quatro estações bem definidas", correct: false },
            { text: "Temperaturas frias e secas", correct: false },
            { text: "Elevadas temperaturas e chuvas abundantes", correct: true }
        ]
    },
    {
        question: "Qual foi a primeira capital do Brasil após a independência?",
        answers: [
            { text: "Rio de Janeiro", correct: false },
            { text: "Salvador", correct: true },
            { text: "Brasília", correct: false },
            { text: "São Paulo", correct: false }
        ]
    },
    {
        question: "Qual foi o movimento que resultou na abolição da escravidão no Brasil?",
        answers: [
            { text: "Movimentos abolicionistas", correct: false },
            { text: "Revolução Industrial", correct: false },
            { text: "Revolução Francesa", correct: true },
            { text: "Guerra do Paraguai", correct: false }
        ]
    },
    {
        question: "Qual evento marcou o início da Primeira Guerra Mundial?",
        answers: [
            { text: "A queda do Muro de Berlim", correct: false },
            { text: "O ataque a Pearl Harbor", correct: false },
            { text: "A Revolução Russa", correct: false },
            { text: "O assassinato do arquiduque Francisco Ferdinando", correct: true }
        ]
    },
    {
        question: "Quem foi o presidente do Brasil responsável pela construção de Brasília?",
        answers: [
            { text: "João Goulart", correct: false },
            { text: "Getúlio Vargas", correct: false },
            { text: "Fernando Collor", correct: false },
            { text: "Juscelino Kubitschek", correct: true }
        ]
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        answers: [
            { text: "Juscelino Kubitschek", correct: false },
            { text: "Deodoro da Fonseca", correct: true },
            { text: "Marechal Floriano Peixoto", correct: false },
            { text: "Getúlio Vargas", correct: false }
        ]
    },
    {
        question: "Qual civilização antiga é conhecida por desenvolver o sistema de escrita cuneiforme?",
        answers: [
            { text: "Egípcia", correct: false },
            { text: "Romana", correct: false },
            { text: "Mesopotâmica", correct: true },
            { text: "Grega", correct: false }
        ]
    },
    {
        question: "Qual foi o principal objetivo das Cruzadas?",
        answers: [
            { text: "Explorar novas rotas comerciais", correct: false },
            { text: "Difundir o cristianismo no Japão", correct: false },
            { text: "Combater o avanço do Império Bizantino", correct: false },
            { text: "Reconquistar Jerusalém dos muçulmanos", correct: true }
        ]
    },
    {
        question: "Qual foi o principal motivo da Guerra Fria entre Estados Unidos e União Soviética?",
        answers: [
            { text: "Conquista do espaço sideral", correct: false },
            { text: "Controle do Oriente Médio", correct: false },
            { text: "Diferenças ideológicas entre capitalismo e comunismo", correct: true },
            { text: "Disputa pelo controle da América Latina", correct: false }
        ]
    },
    {
        question: "Qual é o gênero musical que se originou nas comunidades afro-americanas no início do século XX?",
        answers: [
            { text: "Rock", correct: false },
            { text: "Reggae", correct: false },
            { text: "Jazz", correct: true },
            { text: "Hip Hop", correct: false }
        ]
    },
    {
        question: "O que é ética?",
        answers: [
            { text: "O estudo da beleza", correct: false },
            { text: "A ciência do conhecimento", correct: false },
            { text: "O estudo das sociedades", correct: false },
            { text: "O estudo dos valores e moralidade", correct: true }
        ]
    },
    {
        question: "O que é a globalização?",
        answers: [
            { text: "Interdependência econômica e cultural entre países", correct: true },
            { text: "Aumento da população mundial", correct: false },
            { text: "Isolamento de nações", correct: false },
            { text: "Aumento de guerras e conflitos", correct: false }
        ]
    },
    {
        question: "O que é um 'estereótipo'?",
        answers: [
            { text: "Uma ideia preconcebida sobre um grupo social", correct: true },
            { text: "Uma representação fiel de uma pessoa", correct: false },
            { text: "Uma descrição detalhada de uma cultura", correct: false },
            { text: "Um conceito científico", correct: false }
        ]
    },
    {
        question: "Qual é o principal idioma falado em Dubai?",
        answers: [
            { text: "Hebraico", correct: false },
            { text: "Inglês", correct: false },
            { text: "Árabe", correct: true },
            { text: "Turco", correct: false }
        ]
    },
    {
        question: "Qual das seguintes opções é uma unidade de medida de energia?",
        answers: [
            { text: "Newton", correct: false },
            { text: "Joule", correct: true },
            { text: "Pascal", correct: false },
            { text: "Watt", correct: false }
        ]
    },
    {
        question: "Em uma reação química, os reagentes se transformam em quais substâncias?",
        answers: [
            { text: "Elementos", correct: false },
            { text: "Átomos", correct: false },
            { text: "Íons", correct: false },
            { text: "Produtos", correct: true }
        ]
    },
    {
        question: "Qual organela celular é responsável pela fotossíntese?",
        answers: [
            { text: "Ribossomo", correct: false },
            { text: "Lisossomo", correct: false },
            { text: "Cloroplasto", correct: true },
            { text: "Complexo de Golgi", correct: false }
        ]
    },
    {
        question: "Qual das seguintes substâncias é uma base?",
        answers: [
            { text: "H₂SO₄", correct: false },
            { text: "HCl", correct: false },
            { text: "CO₂", correct: false },
            { text: "NaOH", correct: true }
        ]
    },
    {
        question: "O que caracteriza uma substância iônica?",
        answers: [
            { text: "Ligações covalentes", correct: false },
            { text: "Altos pontos de fusão e ebulição", correct: true },
            { text: "Solubilidade em solventes apolares", correct: false },
            { text: "Estrutura molecular simples", correct: false }
        ]
    },
    {
        question: "Qual é o principal órgão do sistema respiratório humano?",
        answers: [
            { text: "Coração", correct: false },
            { text: "Rins", correct: false },
            { text: "Pulmão", correct: true },
            { text: "Fígado", correct: false }
        ]
    },
    {
        question: "O que é a energia cinética?",
        answers: [
            { text: "Energia potencial", correct: false },
            { text: "Energia térmica", correct: false },
            { text: "Energia armazenada", correct: false },
            { text: "Energia em movimento", correct: true }
        ]
    },
    {
        question: "Qual das seguintes opções é uma forma de energia renovável?",
        answers: [
            { text: "Petróleo", correct: false },
            { text: "Carvão", correct: false },
            { text: "Energia solar", correct: true },
            { text: "Gás natural", correct: false }
        ]
    },
    {
        question: "Qual hormônio é responsável pelo controle dos níveis de glicose no sangue?",
        answers: [
            { text: "Cortisol", correct: false },
            { text: "Adrenalina", correct: false },
            { text: "Glucagon", correct: false },
            { text: "Insulina", correct: true }
        ]
    },
    {
        question: "Qual é a principal característica de uma reação endotérmica?",
        answers: [
            { text: "Libera calor", correct: false },
            { text: "Forma gás", correct: false },
            { text: "Absorve calor", correct: true },
            { text: "Produz luz", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica de uma onda sonora?",
        answers: [
            { text: "Não necessita de um meio para se propagar", correct: false },
            { text: "É uma onda eletromagnética", correct: false },
            { text: "Tem a mesma velocidade em todos os meios", correct: false },
            { text: "É uma onda longitudinal", correct: true }
        ]
    },
    {
        question: "Qual fenômeno ocorre quando um gás se expande rapidamente sem trocar calor com o ambiente?",
        answers: [
            { text: "Expansão isotérmica", correct: false },
            { text: "Expansão adiabática", correct: true },
            { text: "Compressão isobárica", correct: false },
            { text: "Compressão adiabática", correct: false }
        ]
    },
    {
        question: "Qual é a unidade de medida da temperatura no Sistema Internacional?",
        answers: [
            { text: "Joule", correct: false },
            { text: "Fahrenheit", correct: false },
            { text: "Kelvin", correct: true },
            { text: "Celsius", correct: false }
        ]
    },
    {
        question: "Qual é a primeira lei de Newton (Lei da Inércia)?",
        answers: [
            { text: "Força é igual à massa vezes a aceleração", correct: false },
            { text: "A força resultante sobre um corpo é proporcional à sua massa", correct: false },
            { text: "Para toda ação, há uma reação de igual intensidade e sentido oposto", correct: false },
            { text: "Todo corpo continua em repouso ou em movimento retilíneo uniforme, a menos que uma força externa atue sobre ele", correct: true }
        ]
    },
    {
        question: "Qual é o significado da entropia em termodinâmica?",
        answers: [
            { text: "A pressão de um gás", correct: false },
            { text: "A temperatura de equilíbrio", correct: false },
            { text: "A medida da desordem de um sistema", correct: true },
            { text: "A quantidade de calor de um sistema", correct: false }
        ]
    },
    {
        question: "Qual é a fórmula da velocidade média?",
        answers: [
            { text: "Massa ÷ Volume", correct: false },
            { text: "Força ÷ Aceleração", correct: false },
            { text: "Tempo ÷ Distância", correct: false },
            { text: "Distância ÷ Tempo", correct: true }
        ]
    },
    {
        question: "Qual fenômeno ocorre quando a luz muda de direção ao passar de um meio para outro?",
        answers: [
            { text: "Reflexão", correct: false },
            { text: "Refração", correct: true },
            { text: "Difração", correct: false },
            { text: "Dispersão", correct: false }
        ]
    },
    {
        question: "O que é uma cadeia alimentar?",
        answers: [
            { text: "O conjunto de todas as plantas de um ecossistema", correct: false },
            { text: "A relação entre organismos de uma mesma espécie", correct: false },
            { text: "A sequência de transferência de energia entre organismos", correct: true },
            { text: "O movimento das placas tectônicas", correct: false }
        ]
    },
    {
        question: "Qual parte do sistema nervoso é responsável pelo controle voluntário dos músculos?",
        answers: [
            { text: "Cerebelo", correct: false },
            { text: "Tronco encefálico", correct: false },
            { text: "Medula espinhal", correct: false },
            { text: "Cérebro", correct: true }
        ]
    },
    {
        question: "Qual estrutura da planta é responsável pela absorção de água e nutrientes do solo?",
        answers: [
            { text: "Folha", correct: false },
            { text: "Flor", correct: false },
            { text: "Raiz", correct: true },
            { text: "Caule", correct: false }
        ]
    },
    {
        question: "Qual é a molécula responsável pela hereditariedade em organismos vivos?",
        answers: [
            { text: "Lipídio", correct: false },
            { text: "RNA", correct: false },
            { text: "Polissacarídeo", correct: false },
            { text: "DNA", correct: true }
        ]
    },
    {
        question: "Qual é o valor de log 1000",
        answers: [
            { text: "3", correct: true },
            { text: "2", correct: false },
            { text: "5", correct: false },
            { text: "1", correct: false }
        ]
    },
    {
        question: "Qual é a velocidade de uma onda que tem comprimento de onda de 2 metros e frequência de 5 Hz?",
        answers: [
            { text: "10 m/s", correct: true },
            { text: "5 m/s", correct: false },
            { text: "2 m/s", correct: false },
            { text: "12 m/s", correct: false }
        ]
    },
    {
        question: "Qual é o 10º termo da progressão aritmética (PA) onde o primeiro termo é 2 e a razão é 3?",
        answers: [
            { text: "28", correct: false },
            { text: "30", correct: false },
            { text: "27", correct: true },
            { text: "26", correct: false }
        ]
    },
    {
        question: "Qual é a área de um círculo com raio de 3 cm? (Use π = 3, 14) ",
        answers: [
            { text: "18,84 cm²", correct: false },
            { text: "28,26 cm²", correct: true },
            { text: "31,42 cm²", correct: false },
            { text: "19,84 cm²", correct: false }
        ]
    },
    {
        question: "Um carro se move com velocidade constante de 60 km/h. Quanto tempo ele levará para percorrer 180 km?",
        answers: [
            { text: "3,5 horas", correct: false },
            { text: "2,5 horas", correct: false },
            { text: "4 horas", correct: false },
            { text: "3 horas", correct: true }
        ]
    },
    {
        question: "Dada a função f(x) = 2x + 3, qual é o valor de f(5) ?",
        answers: [
            { text: "10", correct: false },
            { text: "12", correct: false },
            { text: "13", correct: true },
            { text: "15", correct: false }
        ]
    },
    {
        question: "Qual é a massa molar do dióxido de carbono ?(Massas atômicas: C = 12, O = 16) ",
        answers: [
            { text: "12 g/mol", correct: false },
            { text: "28 g/mol", correct: false },
            { text: "48 g/mol", correct: false },
            { text: "44 g/mol", correct: true }
        ]
    },
    {
        question: "Quantos anagramas podem ser formados com as letras da palavra 'AMOR'?",
        answers: [
            { text: "34", correct: false },
            { text: "24", correct: true },
            { text: "12", correct: false },
            { text: "68", correct: false }
        ]
    },
    {
        question: "Qual é o quarto termo da progressão geométrica 2, 6, 18, ...? ",
        answers: [
            { text: "98", correct: false },
            { text: "54", correct: false },
            { text: "108", correct: true },
            { text: "72", correct: false }
        ]
    },
    {
        question: "Qual é a mediana dos números 2, 5, 7, 10, 12?",
        answers: [
            { text: "8", correct: false },
            { text: "5", correct: false },
            { text: "9", correct: false },
            { text: "7", correct: true }
        ]
    },
    {
        question: "Um produto custa R$ 150,00 e sofreu um aumento de 10%. Qual é o novo valor do produto?",
        answers: [
            { text: "R$ 180,00", correct: false },
            { text: "R$ 175,00", correct: false },
            { text: "R$ 165,00", correct: true },
            { text: "R$ 160,00", correct: false }
        ]
    },
    {
        question: "Qual é a distância entre os pontos A(1, 2) e B(4, 6) no plano cartesiano?",
        answers: [
            { text: "9", correct: false },
            { text: "3", correct: false },
            { text: "5", correct: true },
            { text: "7", correct: false }
        ]
    },
    {
        question: "Um mapa é desenhado na escala 1:500.000. Se a distância real entre duas cidades é de 150 km, qual é a distância entre essas cidades no mapa?",
        answers: [
            { text: "30 cm", correct: true },
            { text: "20 cm", correct: false },
            { text: "40 cm", correct: false },
            { text: "35 cm", correct: false }
        ]
    },
    {
        question: "Qual é o 7º termo da progressão aritmética em que o primeiro termo é 2 e a razão é 5?",
        answers: [
            { text: "32", correct: true },
            { text: "29", correct: false },
            { text: "37", correct: false },
            { text: "27", correct: false }
        ]
    },
    {
        question: "Se as notas de um estudante foram 6, 8, 7 e 9, qual é a média aritmética dessas notas?",
        answers: [
            { text: "9", correct: false },
            { text: "8", correct: false },
            { text: "7,5", correct: true },
            { text: "8,5", correct: false }
        ]
    },
];






const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const startButton = document.getElementById('start-btn');
const numQuestionsSelect = document.getElementById('num-questions');
const startContainer = document.getElementById('start-container');

let currentQuestionIndex = 0;
let score = 0;
let maxQuestions = 10;
let selectedQuestions = [];

// Adicionando o evento ao botão de início
startButton.addEventListener('click', startGame);

function startGame() {
    startContainer.classList.add('hide'); // Esconde a tela inicial
    scoreContainer.classList.add('hide'); // Esconde o container de pontuação
    questionContainer.classList.remove('hide'); // Mostra o container de perguntas
    answerButtonsElement.classList.remove('hide'); // Mostra os botões de resposta
    nextButton.classList.add('hide'); // Esconde o botão "PRÓXIMA"
    currentQuestionIndex = 0;
    score = 0;

    maxQuestions = parseInt(numQuestionsSelect.value); // Obtém o número de perguntas selecionadas
    selectedQuestions = questions.slice(0, maxQuestions); // Seleciona as perguntas

    setNextQuestion(); // Inicia a primeira pergunta
}

function setNextQuestion() {
    resetState(); // Reseta os botões de resposta
    showQuestion(selectedQuestions[currentQuestionIndex]); // Mostra a próxima pergunta
}

function showQuestion(question) {
    questionElement.innerText = question.question; // Exibe a pergunta
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text; // Exibe a resposta
        button.classList.add('btn');
        answerButtonsElement.appendChild(button); // Adiciona o botão ao DOM
        button.addEventListener('click', selectAnswer.bind(null, answer)); // Adiciona o evento de clique
    });
}

function resetState() {
    nextButton.classList.add('hide'); // Esconde o botão "PRÓXIMA"
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); // Limpa os botões de resposta
    }
}

function selectAnswer(answer) {
    const correct = answer.correct; // Verifica se a resposta está correta
    if (correct) {
        score++; // Incrementa a pontuação
    }
    const buttons = answerButtonsElement.children;
    for (let button of buttons) {
        button.disabled = true; // Desabilita todos os botões de resposta
    }
    nextButton.classList.remove('hide'); // Mostra o botão "PRÓXIMA"
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestions) {
        setNextQuestion(); // Se houver mais perguntas, mostra a próxima
    } else {
        showScore(); // Caso contrário, mostra a pontuação final
    }
});

function showScore() {
    questionContainer.classList.add('hide'); // Esconde o container de perguntas
    scoreContainer.classList.remove('hide'); // Mostra o container de pontuação
    scoreElement.innerText = `${score} de ${maxQuestions}`; // Mostra a pontuação final
}

// Função para reiniciar o jogo ao clicar no botão "JOGAR NOVAMENTE"
restartButton.addEventListener('click', () => {
    startContainer.classList.remove('hide'); // Mostra a tela inicial
    questionContainer.classList.add('hide'); // Esconde o container de perguntas
    scoreContainer.classList.add('hide'); // Esconde o container de pontuação
    resetGame(); // Reseta o estado do jogo
});

// Função para reiniciar a página ao clicar no botão "JOGAR NOVAMENTE"
restartButton.addEventListener('click', () => {
    location.reload(); // Reinicia a página
});

/*******************************************************************************/
/*******************************************************************************/






/*********************************************************************************/
