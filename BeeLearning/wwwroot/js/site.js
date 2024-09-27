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

