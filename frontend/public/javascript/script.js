"use strict";
function exibeListaDePosicoes() {
    const token = localStorage.getItem('token');
    // Se não tiver token, redireciona pro login
    if (!token) {
        alert("Você precisa estar logado para ver as posições!");
        window.location.href = "login.html";
        return;
    }
    fetch(backendAddress + "posicoes/lista/", {
        headers: {
            'Authorization': 'Token ' + token
        }
    })
        .then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                localStorage.removeItem('token');
                window.location.href = "login.html";
            }
            throw new Error("Erro " + res.status);
        }
        return res.json();
    })
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
                let texto = document.createTextNode(posicao[campos[i]] || "-");
                href.appendChild(texto);
                td.appendChild(href);
                tr.appendChild(td);
            }
            // Checkbox para delete (só admin verá o botão depois)
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'ids';
            checkbox.value = posicao['id'];
            let tdCheck = document.createElement('td');
            tdCheck.appendChild(checkbox);
            tr.appendChild(tdCheck);
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro ao carregar posições:", error);
        let tbody = document.getElementById("idtbody");
        if (tbody)
            tbody.innerHTML = "<tr><td colspan='7' class='text-danger text-center'>Erro ao carregar posições. Verifique o login.</td></tr>";
    });
}
let apagaPosicoes = (evento) => {
    evento.preventDefault();
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ids"]:checked');
    const checkedValues = [];
    checkboxes.forEach((checkbox) => {
        checkedValues.push(checkbox.value);
    });
    fetch(backendAddress + "posicoes/lista/", {
        method: "DELETE",
        body: JSON.stringify(checkedValues),
        headers: { 'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        }
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
    const role = localStorage.getItem("role");
    const btnInserir = document.getElementById("insere");
    const btnRemover = document.getElementById("remove");
    // Se for estudante → esconde botões
    if (role !== "admin") {
        btnInserir.style.display = "none";
        btnRemover.style.display = "none";
    }
    // eventos só se for admin
    if (role === "admin") {
        btnInserir.addEventListener('click', () => {
            location.href = "inserePos.html";
        });
        btnRemover.addEventListener('click', apagaPosicoes);
    }
    exibeListaDePosicoes();
};
