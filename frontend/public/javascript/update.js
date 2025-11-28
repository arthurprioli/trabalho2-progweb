"use strict";
onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const idPlace = document.getElementById('id');
    if (id) {
        idPlace.innerHTML = id;
        fetch(backendAddress + "posicoes/pos/" + id + '/')
            .then(res => res.json())
            .then(posicao => {
            let campos = ['id', "nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"];
            for (let i = 0; i < campos.length; i++) {
                console.log(document.getElementById(campos[i]));
                document.getElementById(campos[i]).value = posicao[campos[i]];
            }
        })
            .catch(err => { console.log(err); });
    }
    else {
        idPlace.innerHTML = "URL mal formada: " + window.location;
    }
    document.getElementById("atualiza")
        .addEventListener('click', (evento) => {
        evento.preventDefault();
        const form = document.getElementById("formpos");
        const elements = form.elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        fetch(backendAddress + "posicoes/pos/" + id + "/", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Token ' + localStorage.getItem('token') // Faltou isso
            }
        })
            .then(res => {
            if (res.ok) {
                document.getElementById("mensagem").innerHTML = "Sucesso atualizando dados!";
            }
            else {
                document.getElementById("mensagem").innerHTML = "Erro: " + res.status + " " + res.statusText;
            }
        })
            .catch(err => { console.log(err); });
    });
};
