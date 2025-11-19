"use strict";
function exibeListaDePosicoes() {
    fetch(backendAddress + "posicoes/lista/")
        .then(res => res.json())
        .then(posicoes => {
        let campos = ["nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"];
        let tbody = document.getElementById("idtbody");
        tbody.innerHTML = "";
        for (let posicao of posicoes) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let href = document.createElement('a');
                href.setAttribute('href', 'update.html?id=' + posicao['id']);
                let texto = document.createTextNode(posicao[campos[i]]);
                href.appendChild(texto);
                td.appendChild(href);
                tr.appendChild(td);
            }
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('name', 'id');
            checkbox.setAttribute('id', 'id');
            checkbox.setAttribute('value', posicao['id']);
            let td = document.createElement('td');
            td.appendChild(checkbox);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.log("Erro:", error);
    });
}
let apagaPosicoes = (evento) => {
    evento.preventDefault();
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="id"]:checked');
    const checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    fetch(backendAddress + "posicoes/lista/", {
        method: "DELETE",
        body: JSON.stringify(checkedValues),
        headers: { 'Content-Type': 'application/json', }
    })
        .then(res => {
        if (res.ok) {
            alert("Posições removidas com sucesso!");
        }
        else {
            alert("Erro removendo posições.");
        }
    })
        .catch(err => { console.log(err); })
        .finally(() => { exibeListaDePosicoes(); });
};
onload = function () {
    document.getElementById("insere")
        .addEventListener('click', evento => { location.href = "inserePos.html"; });
    document.getElementById("remove")
        .addEventListener('click', apagaPosicoes);
    exibeListaDePosicoes();
};
