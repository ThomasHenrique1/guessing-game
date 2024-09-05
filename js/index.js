"use strict"
window.onload = function() {
    var num_secreto;
    var tentativas = 0;
    var maxTentativasAntesDica = 5;
    var maxTentativasAntesRevelacao = 10;
    var div_msg = document.getElementById("msg");
    var campo_dica = document.getElementById("txtdica");
    var tentativasElem = document.getElementById("tentativas");
    var dicaEspecificaBtn = document.getElementById("dica-especifica");
    var numeroCorretoElem = document.getElementById("numero-correto");
    var numeroElem = document.getElementById("numero");

    num_secreto = sortearNumero();
    numeroCorretoElem.style.display = 'none'; // Esconde o número correto inicialmente
    
    document.getElementById("botao").onclick = function() {
        tentativas++;
        tentativasElem.textContent = "Tentativas: " + tentativas;

        var num_chute = parseInt(document.getElementById("txtchute").value);
        if (num_chute < num_secreto) {
            campo_dica.value = "O número sorteado é maior";
        } else if (num_chute > num_secreto) {
            campo_dica.value = "O número sorteado é menor";
        } else {
            div_msg.innerHTML = "<h1>Parabéns, você acertou em " + tentativas + " tentativas!</h1>";
            numeroCorretoElem.style.display = 'none'; // Esconde o número correto quando acerta
            resetGame();
            return;
        }

        // Verifica se precisa desbloquear a dica específica ou revelar o número
        if (tentativas === maxTentativasAntesDica) {
            dicaEspecificaBtn.disabled = false;
        }

        if (tentativas === maxTentativasAntesRevelacao) {
            numeroElem.textContent = num_secreto;
            numeroCorretoElem.style.display = 'block'; // Mostra o número correto
            div_msg.innerHTML = "<h1>Você errou muitas vezes. O número era " + num_secreto + "!</h1>";
            resetGame();
        }
    }

    document.getElementById("dica-gratuita").onclick = function() {
        if (tentativas < maxTentativasAntesDica) {
            campo_dica.value = "Clique em 'Verificar' para obter uma dica.";
        } else {
            campo_dica.value = "Você já usou a dica gratuita!";
        }
    }

    document.getElementById("dica-especifica").onclick = function() {
        if (tentativas >= maxTentativasAntesDica) {
            var intervalo = Math.floor(Math.random() * 10) + 1;
            if (num_secreto % intervalo === 0) {
                campo_dica.value = "O número é múltiplo de " + intervalo;
            } else {
                campo_dica.value = "O número não é múltiplo de " + intervalo;
            }
        }
    }

    function sortearNumero() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function resetGame() {
        num_secreto = sortearNumero();
        tentativas = 0;
        tentativasElem.textContent = "Tentativas: " + tentativas;
        campo_dica.value = "";
        dicaEspecificaBtn.disabled = true;
        document.getElementById("txtchute").value = "";
    }
}
