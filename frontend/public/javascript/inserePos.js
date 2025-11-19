"use strict";
onload = () => {
    document.getElementById("insere").addEventListener('click', evento => {
        evento.preventDefault();
        const elements = document.getElementById("formpos").elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        fetch(backendAddress + "posicoes/pos/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
            if (res.ok) {
                document.getElementById("mensagem").innerText = "Dados inseridos com sucesso!";
            }
            else {
                document.getElementById("mensagem").innerText = "Erro na inserção dos dados.";
            }
        })
            .catch(err => { console.log(err); });
    });
};
