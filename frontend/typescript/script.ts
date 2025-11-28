function toggleAprendida(id: number, btn: HTMLButtonElement, row: HTMLTableRowElement) {
    const token = localStorage.getItem('token');

    fetch(backendAddress + 'accounts/aprendidas/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenKeyword + token
        },
        body: JSON.stringify({ posicao_id: id })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Resposta do servidor:", data); // Debug

        // Verifica se o backend retornou exatamente o que esperamos
        if (data.status === 'adicionado') {

            // 1. Adiciona a classe (para manter o padrão semântico)
            row.classList.add('table-success');

            // 2. FORÇA a cor visualmente (sobreescreve o table-striped do Bootstrap)
            // O terceiro parâmetro 'important' é o segredo
            row.style.setProperty('background-color', '#d4edda', 'important');

            btn.innerText = "✅";

        } else {
            // Remove a classe e a cor forçada
            row.classList.remove('table-success');
            row.style.removeProperty('background-color');

            btn.innerText = "⬜";
        }
    })
    .catch(err => console.error("Erro ao marcar:", err));
}


function exibeListaDePosicoes() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Se não tiver token, redireciona pro login
    if (!token) {
        alert("Você precisa estar logado para ver as posições!");
        window.location.href = "login.html";
        return;
    }

    Promise.all([
        fetch(backendAddress + "posicoes/lista/", {
            headers: { 'Authorization': 'Token ' + token }
        }).then(r => {
            if (r.status === 401) throw new Error("401");
            return r.json();
        }),
        fetch(backendAddress + "accounts/aprendidas/", {
            headers: { 'Authorization': 'Token ' + token }
        }).then(r => r.json())
    ])
    .then(([posicoes, idsAprendidos]) => {
        const aprendidosSafe = Array.isArray(idsAprendidos) ? idsAprendidos : [];

        let campos = ["nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"];
        let tbody = document.getElementById("idtbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";

        for (let posicao of posicoes) {
            let tr = document.createElement('tr') as HTMLTableRowElement;
            const foiAprendida = aprendidosSafe.includes(posicao.id);
            if (foiAprendida) {
                tr.classList.add('table-success'); // Classe Bootstrap para verde
                tr.style.backgroundColor = '#d4edda';
            }

            let tdCheck = document.createElement('td');
            let btnCheck = document.createElement('button');
            btnCheck.className = "btn btn-sm btn-light border";
            btnCheck.innerText = foiAprendida ? "✅" : "⬜";
            btnCheck.onclick = (e) => {
                e.preventDefault();
                toggleAprendida(posicao.id, btnCheck, tr);
            };
            tdCheck.appendChild(btnCheck);
            tr.appendChild(tdCheck);

            // 3. Coluna de Checkbox para Deletar (Apenas Admin)
            let tdSelect = document.createElement('td');
            if (role === 'admin') {
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'ids';
                checkbox.value = posicao.id;
                tdSelect.appendChild(checkbox);
            }
            tr.appendChild(tdSelect);

            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td') as HTMLTableCellElement;

                // Lógica: Se for Admin E for o campo Nome, cria Link. Senão, Texto normal.
                if (role === 'admin' && campos[i] === 'nome_pt') {
                    let href = document.createElement('a') as HTMLAnchorElement;
                    href.setAttribute('href', 'update.html?id=' + posicao['id']);
                    href.innerText = posicao[campos[i]] || "-";
                    td.appendChild(href);
                } else {
                    td.innerText = posicao[campos[i]] || "-";
                }
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        }
    })
    .catch(error => {
        console.error("Erro ao carregar dados:", error);
        if (error.message === "401") {
            alert("Sessão expirada. Faça login novamente.");
            localStorage.removeItem('token');
            window.location.href = "login.html";
        } else {
            let tbody = document.getElementById("idtbody");
            if (tbody) tbody.innerHTML = "<tr><td colspan='8' class='text-danger text-center'>Erro ao carregar posições.</td></tr>";
        }
    });
}

let apagaPosicoes = (evento: Event) => {
	evento.preventDefault();
	const checkboxes = document.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"][name="ids"]:checked');
	const checkedValues: string[] = [];
	checkboxes.forEach((checkbox) => {
		checkedValues.push(checkbox.value);
	})

	fetch(backendAddress + "posicoes/lista/", {
		method: "DELETE",
		body: JSON.stringify(checkedValues),
		headers: {'Content-Type': 'application/json',
                   'Authorization': 'Token ' + localStorage.getItem('token')
         }
	})
	.then(res => {
		if (res.ok)
		{
			alert("Posições removidas com sucesso!");
		} else {
			alert("Erro removendo posições.")
		}
	})
	.catch(err => {console.log(err)})
	.finally(() => {exibeListaDePosicoes();});
}

onload = function () {

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const btnInserir = document.getElementById("insere") as HTMLButtonElement;
    const btnRemover = document.getElementById("remove") as HTMLButtonElement;

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


