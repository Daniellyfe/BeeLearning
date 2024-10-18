document.addEventListener("keydown", function() {
    if (!jogoIniciado && event.key === "Enter") {
        botaoIniciar.style.display = "none";
        inimigo.classList.add("animarInimigo");
        document.addEventListener("keydown", teclaPressionada);
        document.addEventListener("keyup", teclaSolta);
        checarMovimentos = setInterval(atualizarMovimentos, 50);
        checarColisaoComBloco = setInterval(colisaoComBloco, 10);
        checarColisaoComInimigo = setInterval(colisaoComInimigo, 10);
        checarRelogio = setInterval(relogio, 1000);
        jogoIniciado = true;
        audioEsperando.volume = 0;
        audioJogoNormal.play();
    } else if (jogoIniciado && event.key === "Enter") {
        alert("Jogo ja foi iniciado");
    }
});
