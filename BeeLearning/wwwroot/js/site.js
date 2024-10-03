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

//document.getElementById('avaliarBtn').addEventListener('click', function () {
//    const redacao = document.getElementById('redacao').value;
//    let nota = 0;

//    // Avaliação de Tese
//    const temTese = redacao.includes('tese') || redacao.includes('argumento');
//    if (temTese) nota += 300; // Aumenta a nota se tiver tese

//    // Avaliação de Coesão
//    const coesao = redacao.split('.').length - 1; // Número de períodos
//    if (coesao >= 3) nota += 300; // Aumenta a nota se tiver pelo menos 3 períodos

//    // Avaliação de Repertório
//    const repertorioPalavras = ['exemplo', 'estudo', 'dados', 'pesquisa'];
//    const repertorioPresente = repertorioPalavras.some(palavra => redacao.includes(palavra));
//    if (repertorioPresente) nota += 200; // Aumenta a nota se usar repertório

//    // Avaliação de Ortografia e Gramática
//    const errosGramaticais = redacao.split(/\s+/).filter(word => word.length < 2).length; // Exemplo simples
//    if (errosGramaticais === 0) nota += 200; // Bônus para sem erros

//    // Garantindo que a nota não passe de 1000
//    nota = Math.min(nota, 1000);

//    document.getElementById('resultado').innerText = `Sua nota: ${nota}`;
//});


/********************************************/


/*  VALIDAÇÃO DA REDAÇÃO*/
// model.js
function avaliarRedacao(redacao, tema) {
    let pontuacao = 1000;

    // Critério de repertórios
    if (!redacao.includes("pesquisa") || !redacao.includes("dados")) {
        pontuacao -= 200;
    }

    // Verificando a tese
    if (!redacao.includes(tema)) {
        pontuacao -= 200;
    }

    // Coesão
    const frases = redacao.split('.').length;
    if (frases < 3) {
        pontuacao -= 200;
    }

    // Erros gramaticais
    const erros = redacao.match(/[\W_]+/g);
    if (erros && erros.length > 0) {
        pontuacao -= 200;
    }

    // Ajuste final
    if (pontuacao < 0) pontuacao = 0;

    return pontuacao;
}

// controller.js
// controller.js
// controller.js
document.getElementById('avaliarBtn').addEventListener('click', function () {
    const redacao = document.getElementById('redacao').value.trim(); // Remove espaços em branco
    const temaSelecionado = document.querySelector('.selectredacao select').value;
    let tema;

    // Se a redação estiver vazia, pontuação será 0
    if (redacao === "") {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = "<p>Pontuação: 0 / 1000</p>";
        return;
    }

    // Mapear valor do select para o tema correspondente
    switch (temaSelecionado) {
        case "1":
            tema = "O impacto das redes sociais na construção da identidade juvenil";
            break;
        case "2":
            tema = "Desigualdade social e suas consequências na educação";
            break;
        case "3":
            tema = "A importância da preservação ambiental para as futuras gerações";
            break;
        case "4":
            tema = "A influência da cultura de massa na formação de valores sociais";
            break;
        case "5":
            tema = "O papel da saúde mental na vida dos jovens";
            break;
        case "6":
            tema = "Desafios e oportunidades da inclusão digital no Brasil";
            break;
        case "7":
            tema = "O papel da literatura na formação do cidadão crítico";
            break;
        case "8":
            tema = "A relação entre tradição e modernidade na sociedade contemporânea";
            break;
        case "9":
            tema = "Mobilidade urbana e seus impactos na qualidade de vida";
            break;
        case "10":
            tema = "O papel da família na formação dos valores éticos e morais";
            break;
        default:
            alert("Por favor, escolha um tema.");
            return;
    }

    const pontuacao = avaliarRedacao(redacao, tema);

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Pontuação: ${pontuacao} / 1000</p>`;
});


/********************************************/