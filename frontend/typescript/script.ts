function exibeListaDePosicoes() {
	fetch(backendAddress + "posicoes/lista/")
		.then(res => res.json())
		.then(posicoes => {
			let campos = ["nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"];
			let tbody = document.getElementById("idtbody") as HTMLTableSectionElement;
			tbody.innerHTML = ""
			for (let posicao of posicoes) {
				let tr = document.createElement('tr') as HTMLTableRowElement;
				for (let i = 0; i < campos.length; i++) {
					let td = document.createElement('td') as HTMLTableCellElement;
					let href = document.createElement('a') as HTMLAnchorElement;
					href.setAttribute('href', 'update.html?id=' + posicao['id']);
					let texto = document.createTextNode(posicao[campos[i]]) as Text;
					href.appendChild(texto);
					td.appendChild(href);
					tr.appendChild(td);
				}
				let checkbox = document.createElement('input') as HTMLInputElement;
				checkbox.setAttribute('type', 'checkbox');
				checkbox.setAttribute('name', 'id');
				checkbox.setAttribute('id', 'id');
				checkbox.setAttribute('value', posicao['id']);
				let td = document.createElement('td') as HTMLTableCellElement;
				td.appendChild(checkbox);
				tr.appendChild(td);
				tbody.appendChild(tr);
			}
		})
		.catch(error => {
			console.log("Erro:", error);
		});
}

let apagaPosicoes = (evento: Event) => {
	evento.preventDefault();
	const checkboxes = document.querySelectorAll<HTMLInputElement>(
		'input[type="checkbox"][name="id"]:checked');
	const checkedValues: string[] = [];
	checkboxes.forEach((checkbox) => {
		checkedValues.push(checkbox.value);
	})

	fetch(backendAddress + "posicoes/lista/", {
		method: "DELETE",
		body: JSON.stringify(checkedValues),
		headers: {'Content-Type': 'application/json', }
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
	(document.getElementById("insere") as HTMLButtonElement)
		.addEventListener('click', evento => { location.href = "inserePos.html" });

	(document.getElementById("remove") as HTMLButtonElement)
		.addEventListener('click', apagaPosicoes);
	exibeListaDePosicoes();
}

