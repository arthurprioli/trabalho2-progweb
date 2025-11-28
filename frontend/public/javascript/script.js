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
            'Authorization': 'Token ' + token // ESSA LINHA ERA O QUE FALTAVA!
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
    const token = localStorage.getItem('token');
    console.log(token);
    fetch(backendAddress + 'accounts/logged_info/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
        if (!res.ok) {
            throw new Error("Falha ao carregar usuário");
        }
        return res.json();
    })
        .then(userdata => {
        console.log("minha role é: " + userdata.role);
        const btnInserir = document.getElementById("insere");
        const btnRemover = document.getElementById("remove");
        const btnAprender = document.getElementById("aprender");
        const colunaRemove = document.getElementById("colunaRemove");
        btnInserir.style.display = "";
        btnRemover.style.display = "";
        btnAprender.style.display = "";
        // Se for estudante → esconde botões
        if (userdata.role !== "admin") {
            console.log("display de usuário");
            btnInserir.style.display = "none";
            btnRemover.style.display = "none";
            if (colunaRemove)
                colunaRemove.textContent = "aprendeu?";
        }
        // eventos só se for admin
        if (userdata.role == "admin") {
            console.log("display de admin");
            btnAprender.style.display = "none";
            btnInserir.addEventListener('click', () => { location.href = "inserePos.html"; });
            btnRemover.addEventListener('click', apagaPosicoes);
        }
        exibeListaDePosicoes();
    })
        .catch(erro => { console.log(erro); });
};
