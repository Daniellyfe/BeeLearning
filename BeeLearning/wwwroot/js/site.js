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

// Adicionar evento ao botão
document.getElementById("avaliarBtn").addEventListener("click", avaliarRedacao);








/*************************************************************/


/*************************SELECIONAR OUTROS************************************/
function showInputPanel() {
    const selectElement = document.getElementById("tema");
    const inputPanel = document.getElementById("inputPanel");
    const otherInput = document.getElementById("otherInput");

    // Verifica se a opção "Outros" foi selecionada
    if (selectElement.value === "other") {
        inputPanel.style.display = "block"; // Mostra a partinha com o input
        otherInput.focus(); // Foca no campo de entrada
    } else {
        inputPanel.style.display = "none"; // Esconde a partinha
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